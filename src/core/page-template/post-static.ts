import { GetStaticPaths, GetStaticProps } from "next";
import {
  getBackrefIndex,
  getPostMetaOrReload,
  getPrevNextIndex,
  getResource,
  getTagIndex,
  loadCache,
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

export function buildPostGetStaticPaths(resourceType: string): GetStaticPaths {
  return async () => {
    console.log(`onGetStaticPaths: ${resourceType}`);
    await loadCache();
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
}

export function buildPostGetStaticProps(
  resourceType: string,
  pathMapper: PostPathMapper,
  hyperProps: PostPageHyperProps
): GetStaticProps<PostPageProps, { slug: string }> {
  return async ({ params }) => {
    console.log(`onGetStaticProps: ${params?.slug}`);
    await loadCache();
    const slug = params!.slug;
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
  };
}

export function buildPostIndexGetStaticProps(
  resourceType: string
): GetStaticProps<PostIndexPageProps> {
  return async () => {
    console.log(`onGetStaticProps: ${resourceType}`);
    await loadCache();
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
  };
}
