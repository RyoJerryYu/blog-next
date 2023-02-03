import Post from "@/components/Post";
import WithHeader from "@/layouts/WithHeader";
import parseMdx from "@/plugins";
import { getSlugs, slugToFile, slugToMatter, slugToPath } from "@/statics";
import { parseMetaFromFile, PostMeta } from "@/statics/utils";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`);
  const paths = getSlugs().map(slugToPath);
  return {
    paths,
    fallback: false,
  };
};

type PostPageProps = {
  slug: string;
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  { slug: string }
> = async ({ params }) => {
  console.log(`onGetStaticProps: ${params?.slug}`);
  const slug = params!.slug;
  let meta = slugToMatter(slug);
  if (process.env.NODE_ENV === "development") {
    // for reloading in development
    console.log(`reloading on dev ${slug}`);
    meta = parseMetaFromFile(slugToFile(slug));
  }
  const source = await parseMdx(meta.content, {
    remarkVsmemoImgOptions: {
      baseDir: `/content/posts/${slug}`,
    },
  });
  const props: PostPageProps = {
    slug,
    source,
    meta,
  };
  // fs.writeFileSync(`temp/${slug}.tmp`, JSON.stringify(props));

  return { props };
};

const PostPage = (props: PostPageProps) => {
  return (
    <>
      <WithHeader>
        <Post meta={props.meta} source={props.source} />
      </WithHeader>
    </>
  );
};

export default PostPage;
