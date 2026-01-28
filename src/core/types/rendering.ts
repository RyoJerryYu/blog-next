import { AnchorTree } from "../parsing/rehype-plugins/rehype-heading-anchor-collection-types";

export type ParseMdxProps = {
  /**
   * The site page path (route path), starts with `/`.
   * e.g. "/learn_from_ai/xxx"
   */
  pagePath: string;
  /**
   * The source file path relative to repo root.
   * e.g. "public/content/learn_from_ai/2026-01-01-xxx.md"
   *
   * Used to set `vfile.path` so remark plugins can resolve relative references.
   */
  filePath: string;
  isMetaPhase?: boolean; // if true, only collect meta data, and not to use index
};

export type CapturedResult = {
  headingTrees: AnchorTree[];
  wikiRefAliases: string[];
  richRefAliases: string[];
  tags: string[];
};
