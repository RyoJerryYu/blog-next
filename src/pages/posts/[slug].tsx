import {
  blogFiles,
  getPostProps,
  getSlugFromFile,
  PostProps,
} from "@/utils/pages";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";

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
    props: await getPostProps(params!.slug),
  };
};

const Post = (props: PostProps) => {
  return (
    <div>
      <h1>Post</h1>
      {props.slug}
      <p>{props.date}</p>
      <p>length: {props.content.length}</p>
      <MDXRemote {...props.source} />
    </div>
  );
};

export default Post;
