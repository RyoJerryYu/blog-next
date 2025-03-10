import { ObsidianTagProps } from "@/core/parsing/complex-plugins/obsidian-tag/types";
import Link from "next/link";
export const ObsidianTag = (props: ObsidianTagProps) => {
  if (props.slug && props.path) {
    return (
      <Link href={props.path} className="tag-word">
        #{props.tag}
      </Link>
    );
  }
  return <span className="tag-word">#{props.tag}</span>;
};
