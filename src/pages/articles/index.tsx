import PostList from "@/components/PostList";
import {
  TagInfo,
  tagInfoListToMap,
} from "@/core/indexing/index-building/tag-index-builder";
import { PostResource } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import {
  articleResourceMap,
  getPrevNextIndex,
  getTagIndex,
  initCache,
} from "@/statics";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  await initCache();
  const articleMap = articleResourceMap();
  const prevNextIndex = getPrevNextIndex();

  const pagePaths = prevNextIndex
    .listResources("articles")
    .map((r) => r.pathMapping.pagePath);
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
  console.log(allTagsMap);
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
