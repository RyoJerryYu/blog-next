import { ObsidianWikilinkProps } from "@/core/parsing/complex-plugins/obsidian-wikilink/types";
import Link from "next/link";

/**
 * It's just an example for how a ObsidianWikilink component should be.
 * It's not used in the project right now.
 */

export const ObsidianWikilink = (props: ObsidianWikilinkProps) => {
  if (props.path) {
    return <Link href={props.path}>{props.label}</Link>;
  }

  return <span>{props.label}</span>;
};
