import { AnchorTree } from "../parsing/rehype-plugins/rehype-heading-anchor-collection-types";

export type ParseMdxProps = {
  pagePath: string;
};

export type CapturedResult = {
  trees: AnchorTree[];
  wikiRefPagePaths: string[];
  richRefPagePaths: string[];
};
