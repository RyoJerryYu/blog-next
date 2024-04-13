import PostList from "@/components/PostList";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import { getClipData, getTagIndex, initCache, Post } from "@/statics";
import { ClipData } from "@/statics/data";
import { TagInfo, tagInfoListToMap } from "@/statics/tag-index";
import { GetStaticProps } from "next";

type ClipsProps = {
  data: ClipData[];
  allTags: TagInfo[];
};

export const getStaticProps: GetStaticProps<ClipsProps> = async () => {
  await initCache();
  const data = getClipData();
  const allTags = getTagIndex().getTags();

  return {
    props: {
      data: data,
      allTags: allTags,
    },
  };
};

export default function ClipsPage(props: ClipsProps) {
  const clipDataToPostCompatible = (clipData: ClipData): Post => {
    return {
      slug: clipData.id,
      file: clipData.url,
      mediaDir: "",
      path: clipData.url,
      meta: {
        title: clipData.title,
        created_at: clipData.created_time,
        content: "",
        abstract: "",
        length: 0,
        updated_at: null,
        license: false,
        tags: clipData.tags,
      },
    };
  };

  const posts = props.data.map(clipDataToPostCompatible);
  const allTagsMap = tagInfoListToMap(props.allTags);

  return (
    <>
      <Title>Clips</Title>
      <DefaultLayout>
        <MainWidth>
          <PostList
            posts={posts}
            allTags={allTagsMap}
            getUrl={(clipData) => clipData.path}
          />
        </MainWidth>
      </DefaultLayout>
    </>
  );
}
