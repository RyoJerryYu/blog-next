import Post from "@/components/Post";
import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder";
import { PostMeta } from "@/core/indexing/meta-collecting/meta-collecting";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, Title } from "@/layouts/UniversalHead";
import parseMdx from "@/plugins";
import {
  getPostMetaOrReload,
  getPrevNextIndex,
  getTagIndex,
  ideaCache,
  initCache,
} from "@/statics";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  await initCache();
  const cache = ideaCache();
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
  prevNextInfo: PrevNextInfo;
};

export const getStaticProps: GetStaticProps<
  IdeaPageProps,
  { slug: string }
> = async ({ params }) => {
  await initCache();
  const cache = ideaCache();
  const slug = params!.slug;
  let meta = await getPostMetaOrReload(cache, slug);
  const pagePath = cache.slugToPath(slug);
  const prevNextInfo = getPrevNextIndex().pagePathToPrevNextInfo(
    "ideas",
    pagePath
  );

  const tagIndex = getTagIndex();
  const tags = tagIndex.getTagsOf(meta.tags);
  const source = await parseMdx(meta.content, {
    remarkObsidianRichOptions: {
      baseDir: cache.slugToMediaDir(slug),
    },
  });
  return {
    props: {
      slug,
      tags,
      source,
      meta,
      prevNextInfo,
    },
  };
};

const IdeaPage = (props: IdeaPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      <DefaultLayout>
        <Post
          meta={props.meta}
          tags={props.tags}
          source={props.source}
          prevNextInfo={props.prevNextInfo}
        />
      </DefaultLayout>
    </>
  );
};

export default IdeaPage;
