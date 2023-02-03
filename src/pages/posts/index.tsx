import PostList from "@/components/PostList";
import WithHeader from "@/layouts/WithHeader";
import { getSlugs, Page, slugToMatter, slugToPage } from "@/statics";
import { PostMeta } from "@/statics/utils";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const slugs = getSlugs();
  const pages = slugs.map(slugToPage);

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
