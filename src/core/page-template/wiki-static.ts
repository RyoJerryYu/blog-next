import {
  getBackrefIndex,
  getPostMetaOrReload,
  getResource,
  getTagIndex,
  getWikiTreeIndex,
  mustGetCache,
} from "../indexing/indexing-cache";
import { WikiPathMapper } from "../indexing/path-mapping/wiki-path-mapper";
import { getResourceMap } from "../indexing/pipeline/resource-pool";
import { parseMdx } from "../parsing/rendering-parse";
import { PagePathMapping, PostMeta, WikiPathMapping } from "../types/indexing";
import { WikiPageProps } from "./wiki-type";

export const wikiGetStaticPaths = async (resourceType: string) => {
  const testwikiMap = getResourceMap<WikiPathMapping, PostMeta>(
    mustGetCache().resourcePool,
    resourceType
  );
  const pagePaths = testwikiMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};

export const wikiGetStaticProps = async (
  resourceType: string,
  slugs: string[],
  pathMapper: WikiPathMapper
): Promise<{ props: WikiPageProps }> => {
  const pagePath = pathMapper.slugsToPagePath(slugs);
  const meta = await getPostMetaOrReload(pagePath);
  const tags = getTagIndex().getTagsOf(meta.tags);
  const wikiTree = getWikiTreeIndex().pagePathToWikiTree(
    resourceType,
    pagePath
  );
  const { source } = await parseMdx(meta.content, {
    pagePath: pagePath,
  });
  const backRefPagePaths = getBackrefIndex().resolve(pagePath);
  const backRefResources = backRefPagePaths.map((pagePath) => {
    return getResource<PagePathMapping, PostMeta>(pagePath);
  });
  return {
    props: {
      slugs,
      meta,
      tags,
      wikiTree,
      source,
      backRefResources,
    },
  };
};
