import {
  blogFiles,
  getSlugFromFile,
  parseMeta,
  searchBlogFile,
} from "@/utils/pages";
import parseMdx from "@/plugins";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import fs from "fs";
import Post from "@/components/Post";
import License from "@/components/License";
import WithHeader from "@/layouts/WithHeader";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`, blogFiles);
  const paths = blogFiles.map(getSlugFromFile).map((slug) => `/posts/${slug}`);
  return {
    paths,
    fallback: false,
  };
};

type PostPageProps = {
  slug: string;
  length: number;
  date: string;
  license: boolean;
  source: MDXRemoteSerializeResult;
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { slug: string }
> = async ({ params }) => {
  const slug = params!.slug;
  const filePath = searchBlogFile(slug)[0]!;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const meta = parseMeta(fileContent);
  const source = await parseMdx(meta.content, {
    remarkVsmemoImgOptions: {
      baseDir: `/content/posts/${slug}`,
    },
  });
  const props: PostPageProps = {
    slug,
    source,
    date: meta.date,
    length: meta.content.length,
    license: meta.license ? true : false,
  };
  fs.writeFileSync(`temp/${slug}.tmp`, JSON.stringify(props));

  return { props };
};

const PostPage = (props: PostPageProps) => {
  return (
    <>
      <WithHeader>
        <Post
          title={"props.slug"}
          length={props.length}
          date={props.date}
          license={props.license}
          source={props.source}
        />
      </WithHeader>
    </>
  );
};

export default PostPage;
