import { Tag } from "@/components/Tag";
import { ObsidianTagProps } from "@/core/parsing/complex-plugins/obsidian-tag/types";

export const ObsidianTag = (props: ObsidianTagProps) => {
  return <Tag tag={props.tag} slug={props.slug} path={props.path} />;
};
