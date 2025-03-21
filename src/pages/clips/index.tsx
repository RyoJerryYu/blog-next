import PostList from "@/components/PostList";
import { ClipData } from "@/core/indexing/index-building/clip-data-index-builder/types";
import {
  TagInfo,
  tagInfoListToMap,
} from "@/core/indexing/index-building/tag-index-builder/types";
import {
  getClipData,
  getTagIndex,
  loadCache,
} from "@/core/indexing/indexing-cache";
import { PostResource } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Title } from "@/layouts/UniversalHead";
import { GetStaticProps } from "next";

type ClipsProps = {
  data: ClipData[];
  allTags: TagInfo[];
};

export const getStaticProps: GetStaticProps<ClipsProps> = async () => {
  await loadCache();
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
  const clipDataToPostCompatible = (clipData: ClipData): PostResource => {
    return {
      pathMapping: {
        slug: clipData.id,
        filePath: clipData.url,
        pagePath: clipData.url,
      },
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
        <PostList posts={posts} allTags={allTagsMap} />
      </DefaultLayout>
    </>
  );
}
