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
