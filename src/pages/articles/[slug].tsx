import { ParsingProvider } from "@/components-parsing/component-parsing";
import { Anchor } from "@/components/antd/Anchor";
import BackRefList from "@/components/BackRefList/BackRefList";
import Comments from "@/components/Comments";
import Post from "@/components/Post";
import {
  articleResourceMap,
  getAliasIndex,
  getPostMetaOrReload,
  getPrevNextIndex,
  getResource,
  getTagIndex,
  loadCache,
  mustGetResourceType,
} from "@/core/indexing/indexing-cache";
import { articlePostPathMapper } from "@/core/indexing/indexing-settings";
import { PostPageProps } from "@/core/page-template/post-types";
import { parseMdx } from "@/core/parsing/rendering-parse";
import { PagePathMapping, PostMeta } from "@/core/types/indexing";
import DefaultLayout from "@/layouts/DefaultLayout";
import { Description, SEOObject, Title } from "@/layouts/UniversalHead";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  console.log(`onGetStaticPaths:`);
  await loadCache();
  const postMap = articleResourceMap();
  const pagePaths = postMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
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
  const backRefPagePaths = getAliasIndex().resolveBackRef(pagePath);
  const backRefResources = backRefPagePaths.map((pagePath) => {
    return getResource<PagePathMapping, PostMeta>(pagePath);
  });

  const tags = getTagIndex().getTagsOf(meta.tags);

  const { source } = await parseMdx(meta.content, {
    pagePath: pagePath,
  });

  const props: PostPageProps = {
    slug,
    tags,
    source,
    meta,
    prevNextInfo,
    backRefResources,
  };
  return { props };
};

const ArticlePage = (props: PostPageProps) => {
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
        <Comments issue-term={props.slug} />
      </DefaultLayout>
    </>
  );
};

export default ArticlePage;
