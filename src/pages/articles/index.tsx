import PostList from "@/components/PostList";
import DefaultLayout from "@/layouts/DefaultLayout";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import { articleCache, getTagIndex, initCache, Post } from "@/statics";
import { TagInfo, tagInfoListToMap } from "@/statics/tag-index";
import { sortPostsByDate } from "@/statics/utils";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  await initCache();
  const cache = articleCache();
  const slugs = cache.getSlugs();
  const posts = sortPostsByDate(slugs.map(cache.slugToPost));

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
