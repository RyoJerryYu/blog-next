import { ParsingProvider } from "@/components-parsing/component-parsing";
import Post from "@/components/Post";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import {
  getPostMetaOrReload,
  getTagIndex,
  loadCache,
  testwikiResourceMap,
} from "@/core/indexing/indexing-cache";
import { testwikiPathMapper } from "@/core/indexing/indexing-settings";
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
  source: MDXRemoteSerializeResult;
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
  const source = await parseMdx(meta.content, {
    pagePath: pagePath,
  });
  return {
    props: { slugs, meta, tags, source },
  };
};

const TestWikiPage = (props: TestWikiPageProps) => {
  console.log(props);
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
            prevNextInfo={{ prevInfo: null, nextInfo: null }}
          />
        </ParsingProvider>
      </DefaultLayout>
    </>
  );
};

export default TestWikiPage;
