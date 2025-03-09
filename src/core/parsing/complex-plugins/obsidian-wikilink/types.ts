import { BlockContent, DefinitionContent } from "mdast";

/**
 * For syntax: `[[alias|label]]`
 *
 * path is the link path resolved from alias
 * and also for the compatibility with link node,
 * label would also exist in the children as a text node
 */
type ObsidianWikilinkPropsBase = {
  alias: string;
  path: string;
  label?: string;
};

export type ObsidianWikilinkPropsMdx = ObsidianWikilinkPropsBase & {
  children?: Array<BlockContent | DefinitionContent>;
};

export type ObsidianWikilinkProps = ObsidianWikilinkPropsBase & {
  children: Array<React.ReactNode>;
};
