import { GetStaticPathsResult } from "next";
import { getResourcePool } from "../indexing/indexing-cache";
import { getResourceMap } from "../indexing/pipeline/resource-pool";
import { PagePathMapping, PostMeta } from "../types/indexing";

export const postGetStaticPaths = async (
  resourceType: string
): Promise<GetStaticPathsResult> => {
  console.log(`onGetStaticPaths:`);
  const postMap = getResourceMap<PagePathMapping, PostMeta>(
    getResourcePool(),
    resourceType
  );
  const pagePaths = postMap.listPagePaths();
  return {
    paths: pagePaths,
    fallback: false,
  };
};
