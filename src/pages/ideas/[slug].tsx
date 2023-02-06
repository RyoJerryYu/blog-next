import Post from "@/components/Post";
import { Title } from "@/layouts/UniversalHead";
import WithHeader from "@/layouts/WithHeader";
import parseMdx from "@/plugins";
import { getPostMetaOrReload, getTagIndex, ideaCache } from "@/statics";
import { ideaLoader, PostMeta } from "@/statics/loader";
import { TagInfo } from "@/statics/tag-index";
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
  tags: TagInfo[];
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
};

export const getStaticProps: GetStaticProps<
  IdeaPageProps,
  { slug: string }
> = async ({ params }) => {
  const cache = await ideaCache();
  const slug = params!.slug;
  let meta = await getPostMetaOrReload(cache, slug);

  const tagIndex = await getTagIndex();
  const tags = tagIndex.getTagsOf(meta.tags);
  const source = await parseMdx(meta.content, {
    remarkVsmemoImgOptions: {
      baseDir: cache.slugToMediaDir(slug),
    },
  });
  return {
    props: {
      slug,
      tags,
      source,
      meta,
    },
  };
};

const IdeaPage = (props: IdeaPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <WithHeader>
        <Post meta={props.meta} tags={props.tags} source={props.source} />
      </WithHeader>
    </>
  );
};

export default IdeaPage;
