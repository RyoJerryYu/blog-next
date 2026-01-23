import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { Box } from "@mui/material";
import TagsBox from "./TagsBox";

export type TagSelectorProps = {
  tags: TagInfo[];
  selectedTagSlug?: string;
};

export default function TagSelector(props: TagSelectorProps) {
  return (
    <Box sx={{ padding: "0.5rem" }}>
      <TagsBox tags={props.tags} highlightedTagSlug={props.selectedTagSlug} />
    </Box>
  );
}
