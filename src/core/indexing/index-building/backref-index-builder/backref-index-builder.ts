import { MDXMeta, Resource } from "@/core/types/indexing";
import { getIndexFromIndexPool, IndexPool } from "../index-building";

import { BasePathMapping } from "@/core/types/indexing";
import { deduplicateArray } from "@/utils/func-utils";
import { AliasIndex } from "../alias-index-builder/alias-index-builder";
import { IndexBuilder } from "../index-building";

export class BackrefIndexBuilder
  implements IndexBuilder<BasePathMapping, MDXMeta, BackrefIndex, "backref">
{
  private readonly refAliases: [string, string[]][]; // page path -> ref aliases
  constructor() {
    this.refAliases = [];
  }
  addResource = (
    resourceType: string,
    resource: Resource<BasePathMapping, MDXMeta>
  ) => {
    const wikiRefAliases = resource.meta.wikiRefAliases || [];
    const richRefAliases = resource.meta.richRefAliases || [];
    const refAliases = [...wikiRefAliases, ...richRefAliases];

    this.refAliases.push([resource.pathMapping.pagePath, refAliases]);
  };
  buildIndex = async (
    indexPool: IndexPool
  ): Promise<{ backref: BackrefIndex }> => {
    const aliasIndex = AliasIndex.fromPool(indexPool);
    const backrefIndex = new Map<string, string[]>(); // to page path -> from page paths

    for (const [pagePath, refAliases] of this.refAliases) {
      for (const alias of refAliases) {
        const toPagePath = aliasIndex.resolve(alias);
        if (!toPagePath) {
          continue;
        }
        if (!backrefIndex.has(toPagePath)) {
          backrefIndex.set(toPagePath, []);
        }
        backrefIndex.get(toPagePath)?.push(pagePath);
      }
    }
    return { backref: new BackrefIndex(backrefIndex) };
  };
}

export class BackrefIndex {
  constructor(private readonly backrefIndex: Map<string, string[]>) {}
  resolve = (pagePath: string) => {
    const res = this.backrefIndex.get(pagePath) || [];
    return deduplicateArray(res);
  };

  static fromPool = getIndexFromIndexPool<BackrefIndex>("backref");
}
