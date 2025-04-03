import PostList from "@/components/PostList";
import TagSelector from "@/components/TagSelector";
import { sortPostsByDate } from "@/core/indexing/index-building/prev-next-index-builder/prev-next-index-builder";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import {
  getResource,
  getTagIndex,
  loadCache,
} from "@/core/indexing/indexing-cache";
import { PagePathMapping, PostMeta, PostResource } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Title } from "@/layouts/UniversalHead";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  const tagIndex = getTagIndex();
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
  posts: PostResource[];
};
export const getStaticProps: GetStaticProps<
  TagPageProps,
  { tag: string }
> = async ({ params }) => {
  await loadCache();
  const tagIndex = getTagIndex();
  const allTagInfos = tagIndex.getTags();
  const selectedTagInfo = tagIndex.getTagsOf([params!.tag])[0];
  const postSlugInfos = selectedTagInfo.postSlugs;

  const posts: Set<PostResource> = new Set();

  postSlugInfos.forEach((slugInfo) => {
    const resource = getResource<PagePathMapping, PostMeta>(
      slugInfo.postPagePath
    );
    posts.add(resource);
  });

  const postArray = sortPostsByDate(Array.from(posts));

  return {
    props: {
      allTagInfos: allTagInfos,
      selectedTagInfo: selectedTagInfo,
      posts: postArray,
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
        <TagSelector
          tags={props.allTagInfos}
          selectedTagSlug={props.selectedTagInfo.slug}
        />
        <PostList posts={props.posts} allTags={tagInfoMap} />
      </DefaultLayout>
    </>
  );
};

export default TagPage;
