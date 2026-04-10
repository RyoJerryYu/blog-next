import { parseMdx } from "@/core/parsing/rendering-parse";
import { MDXMeta, PostMeta, Resource } from "@/core/types/indexing";
import type {
  RenderedAbstract,
  WikilinkPreviewItem,
  WikilinkPreviewMap,
} from "@/core/page-template/post-type";
import { AliasIndex } from "../alias-index-builder/alias-index-builder";
import { getIndexFromIndexPool, IndexPool } from "../index-building";
import { IndexBuilder } from "../index-building";

const normalizeWikiPath = (path: string) => path.split("#")[0];

type PostResourceLite = Resource<
  { filePath: string; pagePath: string },
  PostMeta & MDXMeta
>;

export class AbstractRenderIndexBuilder
  implements
    IndexBuilder<
      { filePath: string; pagePath: string },
      PostMeta & MDXMeta,
      AbstractRenderIndex,
      "abstractRender"
    >
{
  private readonly resources = new Map<string, PostResourceLite>();

  addResource = (_resourceType: string, resource: PostResourceLite) => {
    this.resources.set(resource.pathMapping.pagePath, resource);
  };

  buildIndex = async (
    indexPool: IndexPool,
  ): Promise<{ abstractRender: AbstractRenderIndex }> => {
    const aliasIndex = AliasIndex.fromPool(indexPool);
    const abstractMap: Record<string, RenderedAbstract> = {};
    const previewMapByPage: Record<string, WikilinkPreviewMap> = {};

    const pagePaths = [...this.resources.keys()];
    for (const pagePath of pagePaths) {
      const resource = this.resources.get(pagePath)!;
      const abstract = resource.meta.abstract?.trim();
      if (!abstract) {
        continue;
      }
      const { source } = await parseMdx(abstract, {
        pagePath: resource.pathMapping.pagePath,
        filePath: resource.pathMapping.filePath,
        resolveRefAlias: (alias) => aliasIndex.resolve(alias),
      });
      abstractMap[pagePath] = { source };
    }

    for (const pagePath of pagePaths) {
      const resource = this.resources.get(pagePath)!;
      const refs = resource.meta.wikiRefAliases ?? [];
      const previewMap: WikilinkPreviewMap = {};

      for (const alias of refs) {
        const target = aliasIndex.resolve(alias);
        if (!target) {
          continue;
        }
        const targetPagePath = normalizeWikiPath(target);
        const targetResource = this.resources.get(targetPagePath);
        if (!targetResource) {
          continue;
        }
        const preview: WikilinkPreviewItem = {
          path: targetPagePath,
          title: targetResource.meta.title,
          abstract: abstractMap[targetPagePath] ?? null,
          updatedAt: targetResource.meta.updated_at,
        };
        previewMap[targetPagePath] = preview;
      }

      previewMapByPage[pagePath] = previewMap;
    }

    return {
      abstractRender: new AbstractRenderIndex(abstractMap, previewMapByPage),
    };
  };
}

export class AbstractRenderIndex {
  constructor(
    private readonly abstractMap: Record<string, RenderedAbstract>,
    private readonly previewMapByPage: Record<string, WikilinkPreviewMap>,
  ) {}

  getAbstract = (pagePath: string): RenderedAbstract | undefined => {
    return this.abstractMap[pagePath];
  };

  getAbstracts = (): Record<string, RenderedAbstract> => {
    return this.abstractMap;
  };

  getWikilinkPreviewMap = (fromPagePath: string): WikilinkPreviewMap => {
    return this.previewMapByPage[fromPagePath] ?? {};
  };

  static fromPool = getIndexFromIndexPool<AbstractRenderIndex>("abstractRender");
}
