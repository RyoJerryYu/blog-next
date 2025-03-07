import { BlockContent, DefinitionContent } from "mdast";

export type ObsidianCalloutProps = {
  type: string;
  title?: string;
  foldable?: boolean;
  children?: Array<BlockContent | DefinitionContent>;
};
