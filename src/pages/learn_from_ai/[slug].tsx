import { ParsingProvider } from "@/components-parsing/component-parsing";
import Post from "@/components/Post";
import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder/types";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import {
  getPostMetaOrReload,
  getPrevNextIndex,
  getTagIndex,
  learnFromAiResourceMap,
  loadCache,
  mustGetResourceType,
} from "@/core/indexing/indexing-cache";
import { learnFromAiPostPathMapper } from "@/core/indexing/indexing-settings";
import { parseMdx } from "@/core/parsing/rendering-parse";
import { PostMeta } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, Title } from "@/layouts/UniversalHead";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  const learnFromAiMap = learnFromAiResourceMap();
  const pagePaths = learnFromAiMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};

type LearnFromAiPageProps = {
  slug: string;
  tags: TagInfo[];
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
  prevNextInfo: PrevNextInfo;
};

export const getStaticProps: GetStaticProps<
  LearnFromAiPageProps,
  { slug: string }
> = async ({ params }) => {
  await loadCache();
  const slug = params!.slug;
  const pagePath = learnFromAiPostPathMapper().slugToPagePath(slug);
  let meta = await getPostMetaOrReload(pagePath);
  const prevNextInfo = getPrevNextIndex().pagePathToPrevNextInfo(
    mustGetResourceType(pagePath),
    pagePath
  );

  const tagIndex = getTagIndex();
  const tags = tagIndex.getTagsOf(meta.tags);
  const { source, capturedResult } = await parseMdx(meta.content, {
    pagePath: pagePath,
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

const LearnFromAiPage = (props: LearnFromAiPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      <DefaultLayout>
        <ParsingProvider>
          <Post
            meta={props.meta}
            tags={props.tags}
            source={props.source}
            prevNextInfo={props.prevNextInfo}
          />
        </ParsingProvider>
      </DefaultLayout>
    </>
  );
};

export default LearnFromAiPage;
