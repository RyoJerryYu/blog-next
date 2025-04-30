import {
  getBackrefIndex,
  getPostMetaOrReload,
  getPrevNextIndex,
  getResource,
  getTagIndex,
  mustGetCache,
  mustGetResourceType,
} from "../indexing/indexing-cache";
import { PostPathMapper } from "../indexing/path-mapping/post-path-mapper";
import { getResourceMap } from "../indexing/pipeline/resource-pool";
import { parseMdx } from "../parsing/rendering-parse";
import { PagePathMapping, PostMeta } from "../types/indexing";
import {
  PostIndexPageProps,
  PostPageHyperProps,
  PostPageProps,
} from "./post-type";

export const postGetStaticPaths = async (resourceType: string) => {
  console.log(`onGetStaticPaths: ${resourceType}`);
  const pageMap = getResourceMap<PagePathMapping, PostMeta>(
    mustGetCache().resourcePool,
    resourceType
  );
  const pagePaths = pageMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};

export async function postGetStaticProps(
  resourceType: string,
  pathMapper: PostPathMapper,
  slug: string,
  hyperProps: PostPageHyperProps
): Promise<{ props: PostPageProps }> {
  console.log(`onGetStaticProps: ${slug}`);
  const pagePath = pathMapper.slugToPagePath(slug);
  const meta = await getPostMetaOrReload(pagePath);
  const prevNextInfo = getPrevNextIndex().pagePathToPrevNextInfo(
    mustGetResourceType(pagePath),
    pagePath
  );
  const backRefPagePaths = getBackrefIndex().resolve(pagePath);
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
    hyperProps,
  };

  return { props };
}

export async function postIndexGetStaticProps(
  resourceType: string
): Promise<{ props: PostIndexPageProps }> {
  console.log(`onGetStaticProps: ${resourceType}`);
  const pageMap = getResourceMap<PagePathMapping, PostMeta>(
    mustGetCache().resourcePool,
    resourceType
  );
  console.log(`all page paths for ${resourceType}:`, pageMap.listPagePaths());

  const pagePaths = getPrevNextIndex()
    .listResources(resourceType)
    .map((r) => r.pathMapping.pagePath);
  const posts = pagePaths.map(pageMap.pagePathToResource);
  const allTagsList = getTagIndex().getTags();

  return {
    props: {
      posts,
      allTagsList,
    },
  };
}
