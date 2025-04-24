import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import Post from "@/components/Post";
import { WikiTreeMenu } from "@/components/wiki/WikiTreeMenu";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { WikiTreeInfo } from "@/core/indexing/index-building/wiki-tree-index-builder/types";
import {
  getPostMetaOrReload,
  getTagIndex,
  getWikiTreeIndex,
  loadCache,
  testwikiResourceMap,
} from "@/core/indexing/indexing-cache";
import { testwikiPathMapper } from "@/core/indexing/indexing-settings";
import { AnchorTree } from "@/core/parsing/rehype-plugins/rehype-heading-anchor-collection-types";
import { parseMdx } from "@/core/parsing/rendering-parse";
import { PostMeta } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, Title } from "@/layouts/UniversalHead";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  await loadCache();
  const testwikiMap = testwikiResourceMap();
  const pagePaths = testwikiMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};

type TestWikiPageProps = {
  slugs: string[];
  meta: PostMeta;
  tags: TagInfo[];
  wikiTree: WikiTreeInfo;
  source: MDXRemoteSerializeResult;
  headingTrees: AnchorTree[];
};

export const getStaticProps: GetStaticProps<
  TestWikiPageProps,
  { slugs: string[] }
> = async ({ params }) => {
  await loadCache();
  const slugs = params!.slugs || [];
  const pagePath = testwikiPathMapper().slugsToPagePath(slugs);
  const meta = await getPostMetaOrReload(pagePath);
  const tags = getTagIndex().getTagsOf(meta.tags);
  const wikiTree = getWikiTreeIndex().pagePathToWikiTree("testwiki", pagePath);
  const { source, capturedResult } = await parseMdx(meta.content, {
    pagePath: pagePath,
  });
  return {
    props: {
      slugs,
      meta,
      tags,
      wikiTree,
      source,
      headingTrees: capturedResult.headingTrees,
    },
  };
};

const TestWikiPage = (props: TestWikiPageProps) => {
  return (
    <>
      <Title>{props.meta.title}</Title>
      <Description>{props.meta.abstract}</Description>
      <DefaultLayout
        left={
          <WikiTreeMenu
            trees={props.wikiTree.trees}
            currentSlugs={props.slugs}
          />
        }
        right={
          <Anchor
            items={props.headingTrees}
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
            prevNextInfo={{ prevInfo: null, nextInfo: null }}
          />
        </ParsingProvider>
      </DefaultLayout>
    </>
  );
};

export default TestWikiPage;
