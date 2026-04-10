import {
  getAliasIndex,
  getPostMetaOrReload,
  getResource,
  mustGetResourceType,
} from "../indexing/indexing-cache";
import { parseMdx } from "../parsing/rendering-parse";
import { BasePathMapping, PostMeta } from "../types/indexing";
import type {
  RenderedAbstract,
  WikilinkPreviewItem,
  WikilinkPreviewMap,
} from "./post-type";

export const normalizeWikiPath = (path: string) => {
  return path.split("#")[0];
};

export const renderAbstract = async (
  abstract: string,
  pagePath: string,
  filePath: string,
): Promise<RenderedAbstract | null> => {
  if (!abstract.trim()) {
    return null;
  }

  const { source } = await parseMdx(abstract, {
    pagePath,
    filePath,
  });
  return { source };
};

export const collectWikilinkPreviewMap = async (
  aliases: string[],
): Promise<WikilinkPreviewMap> => {
  const aliasIndex = getAliasIndex();
  const pagePaths = new Set<string>();
  for (const alias of aliases) {
    const resolved = aliasIndex.resolve(alias);
    if (!resolved) {
      continue;
    }
    pagePaths.add(normalizeWikiPath(resolved));
  }

  const entries = await Promise.all(
    [...pagePaths].map(async (pagePath): Promise<[string, WikilinkPreviewItem] | null> => {
      try {
        if (mustGetResourceType(pagePath) === "staticResources") {
          return null;
        }

        const resource = getResource<BasePathMapping, PostMeta>(pagePath);
        const meta = await getPostMetaOrReload(pagePath);
        const abstract = await renderAbstract(
          meta.abstract,
          pagePath,
          resource.pathMapping.filePath,
        );

        return [
          pagePath,
          {
            path: pagePath,
            title: meta.title,
            abstract,
            updatedAt: meta.updated_at,
          },
        ];
      } catch (_error) {
        return null;
      }
    }),
  );

  return Object.fromEntries(
    entries.filter((entry): entry is [string, WikilinkPreviewItem] => entry !== null),
  );
};
