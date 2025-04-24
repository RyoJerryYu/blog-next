import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import Comments from "@/components/Comments";
import Post from "@/components/Post";
import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder/types";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import {
  articleResourceMap,
  getPostMetaOrReload,
  getPrevNextIndex,
  getTagIndex,
  loadCache,
  mustGetResourceType,
} from "@/core/indexing/indexing-cache";
import { articlePostPathMapper } from "@/core/indexing/indexing-settings";
import { parseMdx } from "@/core/parsing/rendering-parse";
import { PostMeta } from "@/core/types/indexing";
import { CapturedResult } from "@/core/types/rendering";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`);
  await loadCache();
  const articleMap = articleResourceMap();
  const pagePaths = articleMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};

type ArticlePageProps = {
  slug: string;
  tags: TagInfo[];
  source: MDXRemoteSerializeResult;
  capturedResult: CapturedResult;
  meta: PostMeta;
  prevNextInfo: PrevNextInfo;
};

export const getStaticProps: GetStaticProps<
  ArticlePageProps,
  { slug: string }
> = async ({ params }) => {
  console.log(`onGetStaticProps: ${params?.slug}`);
  await loadCache();
  const slug = params!.slug;
  const pagePath = articlePostPathMapper().slugToPagePath(slug);
  const meta = await getPostMetaOrReload(pagePath);
  const prevNextInfo = getPrevNextIndex().pagePathToPrevNextInfo(
    mustGetResourceType(pagePath),
    pagePath
  );

  const tags = getTagIndex().getTagsOf(meta.tags);

  const { source, capturedResult } = await parseMdx(meta.content, {
    pagePath: pagePath,
  });

  const props: ArticlePageProps = {
    slug,
    tags,
    source,
    capturedResult,
    meta,
    prevNextInfo,
  };
  // fs.writeFileSync(`temp/${slug}.tmp`, JSON.stringify(props));

  return { props };
};

const ArticlePage = (props: ArticlePageProps) => {
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
            items={props.capturedResult.trees}
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
        <Comments issue-term={props.slug} />
      </DefaultLayout>
    </>
  );
};

export default ArticlePage;
