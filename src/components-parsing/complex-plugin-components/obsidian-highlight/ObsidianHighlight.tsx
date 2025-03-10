import { ObsidianHighlightProps } from "@/core/parsing/complex-plugins/obsidian-highlight/types";

export const ObsidianHighlight = ({ children}: ObsidianHighlightProps) => {
  return (
    <span className="bg-yellow-100">{children}</span>
  );
}