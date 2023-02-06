import PostList from "@/components/PostList";
import MainWidth from "@/layouts/MainWidth";
import { Title } from "@/layouts/UniversalHead";
import WithHeader from "@/layouts/WithHeader";
import { articleCache, getTagIndex, Post } from "@/statics";
import { TagInfo, tagInfoListToMap } from "@/statics/tag-index";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const cache = await articleCache();
  const slugs = cache.getSlugs();
  const posts = slugs.map(cache.slugToPost);

  const allTagsList = (await getTagIndex()).getTags();

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
      <WithHeader>
        <MainWidth>
          <PostList
            posts={props.posts}
            allTags={allTagsMap}
            getUrl={(post) => post.path}
          />
        </MainWidth>
      </WithHeader>
    </>
  );
};

export default ArticlesPage;
