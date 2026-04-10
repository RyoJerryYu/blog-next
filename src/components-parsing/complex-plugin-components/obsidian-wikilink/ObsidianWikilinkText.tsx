import { ObsidianWikilinkProps } from "@/core/parsing/complex-plugins/obsidian-wikilink/types";

export const ObsidianWikilinkText = (props: ObsidianWikilinkProps) => {
  return <span>{props.label ?? props.children}</span>;
};
