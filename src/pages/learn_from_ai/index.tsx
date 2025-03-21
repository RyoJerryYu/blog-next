import PostList from "@/components/PostList";
import {
  TagInfo,
  tagInfoListToMap,
} from "@/core/indexing/index-building/tag-index-builder/types";
import {
  getPrevNextIndex,
  getTagIndex,
  learnFromAiResourceMap,
  loadCache,
} from "@/core/indexing/indexing-cache";
import { PostResource } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Title } from "@/layouts/UniversalHead";
import { GetStaticProps } from "next";

type LearnFromAiProps = {
  posts: PostResource[];
  allTags: TagInfo[];
};

export const getStaticProps: GetStaticProps<LearnFromAiProps> = async () => {
  await loadCache();
  const learnFromAiMap = learnFromAiResourceMap();
  const prevNextIndex = getPrevNextIndex();

  const pagePaths = prevNextIndex
    .listResources("learn_from_ai")
    .map((r) => r.pathMapping.pagePath);
  const posts = pagePaths.map(learnFromAiMap.pagePathToResource);

  const allTags = getTagIndex().getTags();
  return {
    props: { posts: posts, allTags: allTags },
  };
};

const LearnFromAiPage = (props: LearnFromAiProps) => {
  return (
    <>
      <Title>Learn from AI</Title>
      <DefaultLayout>
        <PostList
          posts={props.posts}
          allTags={tagInfoListToMap(props.allTags)}
        />
      </DefaultLayout>
    </>
  );
};

export default LearnFromAiPage;
