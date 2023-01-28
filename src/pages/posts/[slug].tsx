import {
  blogFiles,
  getSlugFromFile,
  parseMdx,
  parseMeta,
  searchBlogFile,
} from "@/utils/pages";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import License from "@/components/License";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(blogFiles);
  const paths = blogFiles.map(getSlugFromFile).map((slug) => `/posts/${slug}`);
  return {
    paths,
    fallback: false,
  };
};

type PostProps = {
  slug: string;
  length: number;
  date: string;
  license: boolean;
  source: MDXRemoteSerializeResult;
};

export const getStaticProps: GetStaticProps<
  PostProps,
  { slug: string }
> = async ({ params }) => {
  const slug = params!.slug;
  const filePath = searchBlogFile(slug)[0]!;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const meta = parseMeta(fileContent);
  const source = await parseMdx(meta.content);

  return {
    props: {
      slug,
      source,
      date: meta.date,
      length: meta.content.length,
      license: meta.license ? true : false,
    },
  };
};

const Post = (props: PostProps) => {
  return (
    <div>
      <h1>Post</h1>
      {props.slug}
      <p>{props.date}</p>
      <p>length: {props.length}</p>
      <MDXRemote {...props.source} />
      {props.license && <License />}
    </div>
  );
};

export default Post;
