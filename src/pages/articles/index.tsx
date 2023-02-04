import PostList from "@/components/PostList";
import WithHeader from "@/layouts/WithHeader";
import { articleCache, Post } from "@/statics";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const cache = await articleCache();
  const slugs = cache.getSlugs();
  const posts = slugs.map(cache.slugToPost);

  return {
    props: {
      posts: posts,
    },
  };
};

type ArticlesProps = {
  posts: Post[];
};

const ArticlesPage = ({ posts: posts }: ArticlesProps) => {
  return (
    <>
      <WithHeader>
        <PostList posts={posts} getUrl={(post) => post.path} />
      </WithHeader>
    </>
  );
};

export default ArticlesPage;
