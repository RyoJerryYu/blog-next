/**
 * Alias Index
 *
 * Resolve a alias to a full path
 *
 * A alias is a alias to a file that could be references, it could be a full path or a short path
 * One file would have multiple alias, but only one full path
 * e.g.
 * full path: /articles/2020-01-27-Building-this-blog.jpg
 * or path to a post should have no extension: /articles/Building-this-blog
 *
 * aliases:
 * - /articles/2020-01-27-Building-this-blog.jpg # full path from root, without site url prefix
 * - articles/2020-01-27-Building-this-blog.jpg # path with layers
 * - 2020-01-27-Building-this-blog.jpg # path without layers
 * - Building-this-blog.jpg # path without date
 *
 * alias to blogs also have no extension:
 * - /articles/2020-01-27-Building-this-blog # full path from root without extension
 * - articles/2020-01-27-Building-this-blog # path with layers without extension
 * - 2020-01-27-Building-this-blog # path without layers and extension
 * - Building-this-blog # path without date and extension
 *
 * specially, alias to a post could have extension:
 * - /articles/2020-01-27-Building-this-blog.md
 * - articles/2020-01-27-Building-this-blog.md
 * - 2020-01-27-Building-this-blog.md
 * - Building-this-blog.md
 */

import { deduplicateArray } from "@/utils/func-utils";
import path from "path";
import {
  BaseMeta,
  BasePathMapping,
  MDXMeta,
  Resource,
} from "../../../types/indexing";
import {
  IndexBuilder,
  IndexPool,
  getIndexFromIndexPool,
} from "../index-building";

const isPageFile = (urlpath: string) => {
  return path.extname(urlpath) === ".md";
};

// aliasesFromPath: get all aliases from a path
// path should pass from post cache, which already parsed and resolvable
// path allow start with `/` or not
// so it could be both a page path or a file path
export const aliasesFromPath = (path: string) => {
  const parts = path.split("/");
  if (parts[0] === "") {
    parts.shift(); // always
  }
  const aliases: string[] = [];
  const needRemoveMd = isPageFile(path);

  aliases.push(path); // full path, e.g. /articles/2020-01-27-Building-this-blog
  if (needRemoveMd) {
    aliases.push(path.replace(".md", ""));
  }
  for (let i = 0; i < parts.length; i++) {
    aliases.push(parts.slice(i).join("/"));
    if (needRemoveMd) {
      aliases.push(parts.slice(i).join("/").replace(".md", ""));
    }
  }
  return aliases;
};

export class AliasIndexBuilder
  implements
    IndexBuilder<BasePathMapping, BaseMeta | MDXMeta, AliasIndex, "alias">
{
  // alias -> path
  private readonly index: Map<string, string>;
  private readonly backRefIndex: Map<string, string[]>; // to page path -> from page paths
  constructor() {
    this.index = new Map();
    this.backRefIndex = new Map();
  }
  addResource = (
    resourceType: string,
    resource: Resource<BasePathMapping, BaseMeta | MDXMeta>
  ) => {
    const { filePath, pagePath } = resource.pathMapping;
    const aliases = [
      ...aliasesFromPath(pagePath),
      ...aliasesFromPath(filePath),
    ];
    for (const alias of aliases) {
      if (!this.index.has(alias)) {
        // first add posts, then add static contents
        // .md static files would resolved to pages
        this.index.set(alias, pagePath);
        continue;
      }

      if (this.index.get(alias) === pagePath) {
        continue;
      }
      // console.log(
      //   `Alias ${alias} already exists, path: ${this.index.get(
      //     alias
      //   )}, new path: ${pagePath}`
      // );
    }

    if (
      !("wikiRefAliases" in resource.meta) ||
      !("richRefAliases" in resource.meta)
    ) {
      return;
    }

    const wikiRefAliases = resource.meta.wikiRefAliases || [];
    const richRefAliases = resource.meta.richRefAliases || [];
    const refAliases = [...wikiRefAliases, ...richRefAliases];

    for (const alias of refAliases) {
      const toPagePath = this.index.get(alias);
      if (!toPagePath) {
        continue;
      }

      if (!this.backRefIndex.has(toPagePath)) {
        this.backRefIndex.set(toPagePath, []);
      }
      this.backRefIndex.get(toPagePath)?.push(pagePath);
    }
  };
  buildIndex = async (indexPool: IndexPool): Promise<{ alias: AliasIndex }> => {
    return {
      alias: new AliasIndex(this.index, this.backRefIndex),
    };
  };
}

export class AliasIndex {
  private readonly index: Map<string, string>;
  private readonly backRefIndex: Map<string, string[]>;
  constructor(index: Map<string, string>, backRefIndex: Map<string, string[]>) {
    this.index = index;
    this.backRefIndex = backRefIndex;
  }

  resolve = (alias: string) => {
    return this.index.get(alias);
  };

  resolveBackRef = (pagePath: string) => {
    const res = this.backRefIndex.get(pagePath) || [];
    return deduplicateArray(res);
  };

  static fromPool = getIndexFromIndexPool<AliasIndex>("alias");
}
