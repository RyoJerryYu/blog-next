import PostList from "@/components/PostList";
import WithHeader from "@/layouts/WithHeader";
import { initCache, Page } from "@/statics";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const cache = await initCache();
  const slugs = cache.getSlugs();
  const pages = slugs.map(cache.slugToPage);

  return {
    props: {
      pages: pages,
    },
  };
};

type PostsProps = {
  pages: Page[];
};

const PostListPage = ({ pages: pages }: PostsProps) => {
  return (
    <>
      <WithHeader>
        <PostList posts={pages} getUrl={(post) => `/posts/${post.slug}`} />
      </WithHeader>
    </>
  );
};

export default PostListPage;
