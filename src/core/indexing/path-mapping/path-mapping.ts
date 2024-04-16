/**
 * All resource are uniquely identified by their pagePath
 * attention: filePath may not be unique between two types of resources
 * e.g. a .md file may be both an page resource and a static resource, with different pagePath
 */
export type ResourcePathMapping = {
  /**
   * start without slash, relative to project root, mostly start with "public/"
   * e.g. "public/content/articles/2021-01-01-hello-world.md"
   * should be available for fs.readFileSync(filePath, "utf-8")
   */
  filePath: string;
  /**
   * start with slash, relative to SITE_BASE_PATH
   * e.g. "/content/articles/2022-07-31-why-homogeneous.md"
   * or, for a page, "/articles/why-homogeneous"
   * should be available for referencing on the web by `${SITE_BASE_PATH}${resourcePath}`
   */
  pagePath: string;
};

export type PagePathMapping = ResourcePathMapping & {
  /**
   * the nextjs route param, should be unique for a type of resource
   * no prefix slash and no suffix file extension
   * e.g. "why-homogeneous"
   * one slug and one type of resource should relate to one pagePath
   */
  slug: string;
};

/**
 * A type of PageMapper responsible for mapping for a type of resource
 * Though filePath is not unique between two types of resources,
 * it should be unique for one type of resource.
 * So filePath is used as the key for the mapping.
 *
 * @template PathMapping the type of path mapping for this type of resource
 */
export interface PathMapper<PathMapping extends ResourcePathMapping> {
  listFilePaths: () => Promise<string[]>;
  filePath2PathMapping: (filePath: string) => PathMapping;
}

export const listPathMappings = async <PathMapping extends ResourcePathMapping>(
  pathMapper: PathMapper<PathMapping>
) => {
  const existPath: Set<string> = new Set();
  const filePaths = await pathMapper.listFilePaths();
  return filePaths.map((filePath) => {
    if (existPath.has(filePath)) {
      throw new Error(`Duplicate filePath: ${filePath}`);
    }
    return pathMapper.filePath2PathMapping(filePath);
  });
};
