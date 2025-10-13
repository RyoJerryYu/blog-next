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
  const wikiTreeIndex = getWikiTreeIndex();
  const virtualPagePaths = wikiTreeIndex
    .listTreeNodeTOCs(resourceType)
    .filter((node) => node.isVirtual)
    .map((node) => node.pagePath);
  return {
    paths: [...pagePaths, ...virtualPagePaths],
    fallback: false,
  };
};

export const wikiGetStaticProps = async (
  resourceType: string,
  slugs: string[],
  pathMapper: WikiPathMapper
): Promise<{ props: WikiPageProps }> => {
  const pagePath = pathMapper.slugsToPagePath(slugs);
  const wikiTreeIndex = getWikiTreeIndex();
  const wikiTree = wikiTreeIndex.pagePathToWikiTree(resourceType, pagePath);
  const treeNodeTOC = wikiTreeIndex.pagePathToTreeNodeTOC(
    resourceType,
    pagePath
  );
  if (treeNodeTOC.isVirtual) {
    return {
      props: {
        isIndexOnly: true,
        slugs,
        wikiTree,
        treeNodeTOC: treeNodeTOC,
      },
    };
  }

  const meta = await getPostMetaOrReload(pagePath);
  const tags = getTagIndex().getTagsOf(meta.tags);
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
      wikiTree,
      meta,
      tags,
      source,
      backRefResources,
    },
  };
};
