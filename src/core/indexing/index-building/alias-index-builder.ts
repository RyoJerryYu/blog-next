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

import { glob } from "glob";
import path from "path";
import { BasePathMapping } from "../../types/indexing";
import { BaseMeta } from "../meta-collecting/meta-collecting";
import { IndexBuilder, Resource } from "./index-building";

export function listAllStaticFiles() {
  return glob.sync("public/content/**/*.*");
}

const isPages = (urlpath: string) => {
  return path.extname(urlpath) === "";
};

// aliasesFromPath: get all aliases from a path
// path should pass from post cache, which already parsed and resolvable
// path should always start with `/`
export const aliasesFromPagePath = (pagePath: string) => {
  const parts = pagePath.split("/");
  if (parts[0] === "") {
    parts.shift(); // always
  }
  const aliases: string[] = [];
  const needAppendMd = isPages(pagePath);

  aliases.push(pagePath); // full path, e.g. /articles/2020-01-27-Building-this-blog
  if (needAppendMd) {
    aliases.push(pagePath.concat(".md"));
  }
  for (let i = 0; i < parts.length; i++) {
    aliases.push(parts.slice(i).join("/"));
    if (needAppendMd) {
      aliases.push(parts.slice(i).join("/").concat(".md"));
    }
  }
  return aliases;
};

export class AliasIndexBuilder
  implements IndexBuilder<BasePathMapping, BaseMeta, AliasIndex, "alias">
{
  // alias -> path
  private readonly index: Map<string, string>;
  constructor() {
    this.index = new Map();
  }
  addResource = (
    resourceType: string,
    resource: Resource<BasePathMapping, BaseMeta>
  ) => {
    const { pagePath } = resource.pathMapping;
    const aliases = aliasesFromPagePath(pagePath);
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
      console.log(
        `Alias ${alias} already exists, path: ${this.index.get(
          alias
        )}, new path: ${pagePath}`
      );
    }
  };
  buildIndex = async (): Promise<{ alias: AliasIndex }> => {
    return {
      alias: new AliasIndex(this.index),
    };
  };
}

export class AliasIndex {
  private readonly index: Map<string, string>;
  constructor(index: Map<string, string>) {
    this.index = index;
  }

  resolve = (alias: string) => {
    return this.index.get(alias);
  };
}
