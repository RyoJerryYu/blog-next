import PostList from "@/components/PostList";
import TagSelector from "@/components/TagSelector";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import {
  articleResourceMap,
  getTagIndex,
  ideaResourceMap,
  initCache,
  Post,
  resourceToPost,
} from "@/statics";
import { sortPostsByDate } from "@/statics/utils";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  await initCache();
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
  posts: Post[];
};
export const getStaticProps: GetStaticProps<
  TagPageProps,
  { tag: string }
> = async ({ params }) => {
  await initCache();
  const tagIndex = getTagIndex();
  const allTagInfos = tagIndex.getTags();
  const selectedTagInfo = tagIndex.getTagsOf([params!.tag])[0];
  const postSlugInfos = selectedTagInfo.postSlugs;

  const posts: Set<Post> = new Set();
  const articleMap = articleResourceMap();
  const ideaMap = ideaResourceMap();

  postSlugInfos.forEach((slugInfo) => {
    if (slugInfo.postType === "article") {
      const resource = articleMap.pagePathToResource(slugInfo.postPagePath);
      posts.add(resourceToPost(resource));
    }
    if (slugInfo.postType === "idea") {
      const resource = ideaMap.pagePathToResource(slugInfo.postPagePath);
      posts.add(resourceToPost(resource));
    }
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
        <MainWidth>
          <TagSelector
            tags={props.allTagInfos}
            selectedTagSlug={props.selectedTagInfo.slug}
          />
          <PostList
            posts={props.posts}
            allTags={tagInfoMap}
            getUrl={(post) => post.pagePath}
          />
        </MainWidth>
      </DefaultLayout>
    </>
  );
};

export default TagPage;
