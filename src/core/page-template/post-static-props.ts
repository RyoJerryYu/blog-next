import { getTagIndex } from "../indexing/indexing-cache";

import { getResource } from "../indexing/indexing-cache";

import { PostMeta } from "../types/indexing";

import { getAliasIndex } from "../indexing/indexing-cache";

import {
  getPrevNextIndex,
  mustGetResourceType,
} from "../indexing/indexing-cache";

import { getPostMetaOrReload } from "../indexing/indexing-cache";
import { PostPathMapper } from "../indexing/path-mapping/post-path-mapper";
import { parseMdx } from "../parsing/rendering-parse";
import { PagePathMapping } from "../types/indexing";
import { PostPageProps } from "./post-types";

export const postStaticProps = async (
  slug: string,
  pathMapper: PostPathMapper
) => {
  console.log(`onGetStaticProps: ${slug}`);
  const pagePath = pathMapper.slugToPagePath(slug);
  let meta = await getPostMetaOrReload(pagePath);
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
