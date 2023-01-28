import { blogFiles, PostProps, getSlugFromFile } from "@/utils/pages";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(blogFiles);
  const paths = blogFiles.map(getSlugFromFile).map((slug) => `/posts/${slug}`);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostProps,
  { slug: string }
> = async ({ params }) => {
  return {
    props: { slug: params!.slug },
  };
};

const Post = (props: PostProps) => {
  return (
    <div>
      <h1>Post</h1>
      {props.slug}
    </div>
  );
};

export default Post;
