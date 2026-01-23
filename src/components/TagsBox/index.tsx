import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { Stack, SxProps, Theme } from "@mui/material";
import { Tag } from "../Tag";
import style from "./TagsBox.module.scss";

type TagsBoxProps = {
  className?: string;
  tags: TagInfo[];
  highlightedTagSlug?: string;
  sx?: SxProps<Theme>;
};

const TagsBox: React.FC<TagsBoxProps> = (props: TagsBoxProps) => {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap="0.5rem" // gap-2
      className={props.className}
      sx={props.sx}
    >
      {props.tags.map((tagInfo) => {
        return (
          <Tag
            key={tagInfo.slug}
            tag={tagInfo.tag}
            slug={tagInfo.slug}
            path={tagInfo.path}
            className={
              props.highlightedTagSlug === tagInfo.slug
                ? style.highlightedTag
                : style.tag
            }
          />
        );
      })}
    </Stack>
  );
};
export default TagsBox;
