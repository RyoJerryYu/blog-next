import { AnchorTree } from "../parsing/rehype-plugins/rehype-heading-anchor-collection-types";

export type ParseMdxProps = {
  pagePath: string;
  isMetaPhase?: boolean; // if true, only collect meta data, and not to use index
};

export type CapturedResult = {
  headingTrees: AnchorTree[];
  wikiRefAliases: string[];
  richRefAliases: string[];
  tags: string[];
};
