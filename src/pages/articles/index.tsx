import PostList from "@/components/PostList";
import WithHeader from "@/layouts/WithHeader";
import { initCache, Post } from "@/statics";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  const cache = await initCache();
  const slugs = cache.getSlugs();
  const posts = slugs.map(cache.slugToPage);

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
