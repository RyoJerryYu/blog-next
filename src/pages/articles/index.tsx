import PostList from "@/components/PostList";
import {
  TagInfo,
  tagInfoListToMap,
} from "@/core/indexing/index-building/tag-index-builder/types";
import {
  articleResourceMap,
  getPrevNextIndex,
  getTagIndex,
  loadCache,
} from "@/core/indexing/indexing-cache";
import { PostResource } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  await loadCache();
  const articleMap = articleResourceMap();
  console.log("articleMap.listPagePaths()", articleMap.listPagePaths());
  const prevNextIndex = getPrevNextIndex();

  const pagePaths = prevNextIndex
    .listResources("articles")
    .map((r) => r.pathMapping.pagePath);
  console.log("pagePaths", pagePaths);
  const posts = pagePaths.map(articleMap.pagePathToResource);

  const allTagsList = getTagIndex().getTags();

  return {
    props: {
      posts: posts,
      allTagsList: allTagsList,
    },
  };
};

type ArticlesProps = {
  allTagsList: TagInfo[];
  posts: PostResource[];
};

const ArticlesPage = (props: ArticlesProps) => {
  const allTagsMap = tagInfoListToMap(props.allTagsList);
  return (
    <>
      <Title>Articles</Title>
      <DefaultLayout>
        <MainWidth>
          <PostList posts={props.posts} allTags={allTagsMap} />
        </MainWidth>
      </DefaultLayout>
    </>
  );
};

export default ArticlesPage;
