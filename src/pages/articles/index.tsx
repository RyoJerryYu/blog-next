import PostList from "@/components/PostList";
import {
  TagInfo,
  tagInfoListToMap,
} from "@/core/indexing/index-building/tag-index-builder";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import {
  Post,
  articleResourceMap,
  getTagIndex,
  initCache,
  resourceToPost,
} from "@/statics";
import { sortPostsByDate } from "@/statics/utils";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  await initCache();
  const articleMap = articleResourceMap();
  const pagePaths = articleMap.listPagePaths();

  // TODO: use prevNextIndex
  const unsortedPosts = pagePaths
    .map(articleMap.pagePathToResource)
    .map(resourceToPost);
  const posts = sortPostsByDate(unsortedPosts);

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
  posts: Post[];
};

const ArticlesPage = (props: ArticlesProps) => {
  const allTagsMap = tagInfoListToMap(props.allTagsList);
  console.log(allTagsMap);
  return (
    <>
      <Title>Articles</Title>
      <DefaultLayout>
        <MainWidth>
          <PostList
            posts={props.posts}
            allTags={allTagsMap}
            getUrl={(post) => post.pagePath}
          />
        </MainWidth>
      </DefaultLayout>
    </>
  );
};

export default ArticlesPage;
