import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import BackRefList from "@/components/BackRefList/BackRefList";
import Post from "@/components/Post";
import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder/types";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import {
  getBackrefIndex,
  getPostMetaOrReload,
  getPrevNextIndex,
  getResource,
  getTagIndex,
  learnFromAiResourceMap,
  loadCache,
  mustGetResourceType,
} from "@/core/indexing/indexing-cache";
import { learnFromAiPostPathMapper } from "@/core/indexing/indexing-settings";
import { parseMdx } from "@/core/parsing/rendering-parse";
import {
  MDXMeta,
  PagePathMapping,
  PostMeta,
  PostResource,
} from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
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
  meta: PostMeta & MDXMeta;
  prevNextInfo: PrevNextInfo;
  backRefResources: PostResource[];
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
  const backRefPagePaths = getBackrefIndex().resolve(pagePath);
  const backRefResources = backRefPagePaths.map((pagePath) => {
    return getResource<PagePathMapping, PostMeta>(pagePath);
  });

  const tagIndex = getTagIndex();
  const tags = tagIndex.getTagsOf(meta.tags);
  const { source } = await parseMdx(meta.content, {
    pagePath: pagePath,
  });
  return {
    props: {
      slug,
      tags,
      source,
      meta,
      prevNextInfo,
      backRefResources,
    },
  };
};

const LearnFromAiPage = (props: LearnFromAiPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      <SEOObject
        article={{
          publishedTime: props.meta.created_at ?? undefined,
          modifiedTime: props.meta.updated_at ?? undefined,
          tags: props.meta.tags,
        }}
      />
      <DefaultLayout
        right={
          <Anchor
            items={props.meta.headingTrees}
            offsetTop={64}
            className="overflow-y-auto"
          />
        }
      >
        <ParsingProvider>
          <Post
            meta={props.meta}
            tags={props.tags}
            source={props.source}
            prevNextInfo={props.prevNextInfo}
          />
        </ParsingProvider>
        <BackRefList posts={props.backRefResources} />
      </DefaultLayout>
    </>
  );
};

export default LearnFromAiPage;
