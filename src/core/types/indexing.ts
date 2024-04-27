/****************
 * PathMapping
 */

/**
 * All resource are uniquely identified by their pagePath
 * attention: filePath may not be unique between two types of resources
 * e.g. a .md file may be both an page resource and a static resource, with different pagePath
 */
export type BasePathMapping = {
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

export type PagePathMapping = BasePathMapping & {
  /**
   * the nextjs route param, should be unique for a type of resource
   * no prefix slash and no suffix file extension
   * e.g. "why-homogeneous"
   * one slug and one type of resource should relate to one pagePath
   */
  slug: string;
};

/****************
 * Meta
 */

/**
 * One resource on the site could have it's own meta data.
 * Different types of resources may have different type of meta data.
 *
 * Mostly meta will be a parameter of it's page component and used for rendering.
 * So, meta must be json serializable.
 * Optional fields should have type as T | null, not T | undefined.
 */
export type BaseMeta = {};

/**
 * The meta data for a post should have.
 */
export type PostMeta = BaseMeta & {
  content: string;
  title: string;
  abstract: string;
  length: number;
  created_at: string | null;
  updated_at: string | null;
  tags: string[];
  license: boolean;
};

/****************
 * Resource
 */
/**
 * A type of resource that can be indexed.
 * A resource should have a pathMapping and a meta.
 */
export type Resource<PathMapping, Meta> = {
  readonly pathMapping: Readonly<PathMapping>;
  readonly meta: Readonly<Meta>;
};

export type PostResource = Resource<PagePathMapping, PostMeta>;
