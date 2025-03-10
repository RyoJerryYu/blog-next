import { ObsidianHighlightProps } from "@/core/parsing/complex-plugins/obsidian-highlight/types";

export const ObsidianHighlight = ({ children}: ObsidianHighlightProps) => {
  return (
    <span className="highlight-word">{children}</span>
  );
}