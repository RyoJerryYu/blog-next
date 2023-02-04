import Post from "@/components/Post";
import WithHeader from "@/layouts/WithHeader";
import parseMdx from "@/plugins";
import { articleCache } from "@/statics";
import { articleLoader, PostMeta } from "@/statics/loader";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`);
  const cache = await articleCache();
  const paths = cache.getSlugs().map(cache.slugToPath);
  return {
    paths,
    fallback: false,
  };
};

type ArticlePageProps = {
  slug: string;
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
};

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  { slug: string }
> = async ({ params }) => {
  console.log(`onGetStaticProps: ${params?.slug}`);
  const cache = await articleCache();
  const slug = params!.slug;
  let meta = cache.slugToMeta(slug);
  if (process.env.NODE_ENV === "development") {
    // for reloading in development
    console.log(`reloading on dev ${slug}`);
    const loader = articleLoader();
    meta = loader.parseMetaFromFile(cache.slugToFile(slug));
  }
  const source = await parseMdx(meta.content, {
    remarkVsmemoImgOptions: {
      baseDir: cache.slugToMediaDir(slug),
    },
  });
  const props: ArticlePageProps = {
    slug,
    source,
    meta,
  };
  // fs.writeFileSync(`temp/${slug}.tmp`, JSON.stringify(props));

  return { props };
};

const ArticlePage = (props: ArticlePageProps) => {
  return (
    <>
      <WithHeader>
        <Post meta={props.meta} source={props.source} />
      </WithHeader>
    </>
  );
};

export default ArticlePage;
