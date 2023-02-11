import PostList from "@/components/PostList";
import TagsBox from "@/components/TagsBox";
import TagSelector from "@/components/TagSelector";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import DefaultLayout from "@/layouts/DefaultLayout";
import { articleCache, getTagIndex, ideaCache, Post } from "@/statics";
import { TagInfo } from "@/statics/tag-index";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const tagIndex = await getTagIndex();
  const tagInfos = tagIndex.getTags();
  const paths = tagInfos.map((tag) => tag.path);

  return {
    paths: paths,
    fallback: false,
  };
};

type TagPageProps = {
  allTagInfos: TagInfo[];
  selectedTagInfo: TagInfo;
  posts: Post[];
};
export const getStaticProps: GetStaticProps<
  TagPageProps,
  { tag: string }
> = async ({ params }) => {
  const tagIndex = await getTagIndex();
  const allTagInfos = tagIndex.getTags();
  const selectedTagInfo = tagIndex.getTagsOf([params!.tag])[0];
  const postSlugInfos = selectedTagInfo.postSlugs;

  const posts: Set<Post> = new Set();
  const articleCaches = await articleCache();
  const ideaCaches = await ideaCache();

  postSlugInfos.forEach((slugInfo) => {
    if (slugInfo.postType === "article") {
      posts.add(articleCaches.slugToPost(slugInfo.postSlug));
    }
    if (slugInfo.postType === "idea") {
      posts.add(ideaCaches.slugToPost(slugInfo.postSlug));
    }
  });

  return {
    props: {
      allTagInfos: allTagInfos,
      selectedTagInfo: selectedTagInfo,
      posts: Array.from(posts),
    },
  };
};

const TagPage = (props: TagPageProps) => {
  const tagInfoMap = new Map<string, TagInfo>();
  props.allTagInfos.forEach((tagInfo) => {
    tagInfoMap.set(tagInfo.tag, tagInfo);
  });
  return (
    <>
      <Title>{props.selectedTagInfo.tag}</Title>
      <DefaultLayout>
        <MainWidth>
          <TagSelector
            tags={props.allTagInfos}
            selectedTagSlug={props.selectedTagInfo.slug}
          />
          <PostList
            posts={props.posts}
            allTags={tagInfoMap}
            getUrl={(post) => post.path}
          />
        </MainWidth>
      </DefaultLayout>
    </>
  );
};

export default TagPage;
