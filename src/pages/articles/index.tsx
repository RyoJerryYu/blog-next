import PostList from "@/components/PostList";
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
      <WithHeader>
        <PostList
          posts={props.posts}
          allTags={allTagsMap}
          getUrl={(post) => post.path}
        />
      </WithHeader>
    </>
  );
};

export default ArticlesPage;
