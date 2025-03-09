import { BlockContent, DefinitionContent } from "mdast";
import React from "react";

type ObsidianCalloutPropsBase = {
  type: string;
  title?: string;
  foldable?: boolean; // default is false
  isCollapsed?: boolean; // default is false
};

export type ObsidianCalloutPropsMdx = ObsidianCalloutPropsBase & {
  children?: Array<BlockContent | DefinitionContent>;
};

export type ObsidianCalloutProps = ObsidianCalloutPropsBase & {
  children: Array<React.ReactNode>;
};
