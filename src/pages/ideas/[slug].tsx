import Post from "@/components/Post";
import WithHeader from "@/layouts/WithHeader";
import parseMdx from "@/plugins";
import { ideaCache } from "@/statics";
import { ideaLoader, PostMeta } from "@/statics/loader";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  const cache = await ideaCache();
  const path = cache.getSlugs().map(cache.slugToPath);
  return {
    paths: path,
    fallback: false,
  };
};

type IdeaPageProps = {
  slug: string;
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
};

export const getStaticProps: GetStaticProps<
  IdeaPageProps,
  { slug: string }
> = async ({ params }) => {
  const cache = await ideaCache();
  const slug = params!.slug;
  let meta = cache.slugToMeta(slug);
  if (process.env.NODE_ENV === "development") {
    // for reloading in development
    console.log(`reloading on dev ${slug}`);
    const loader = ideaLoader();
    meta = loader.parseMetaFromFile(cache.slugToFile(slug));
  }
  const source = await parseMdx(meta.content, {
    remarkVsmemoImgOptions: {
      baseDir: cache.slugToMediaDir(slug),
    },
  });
  return {
    props: {
      slug,
      source,
      meta,
    },
  };
};

const IdeaPage = (props: IdeaPageProps) => {
  return (
    <>
      <WithHeader>
        <Post meta={props.meta} source={props.source} />
      </WithHeader>
    </>
  );
};

export default IdeaPage;
