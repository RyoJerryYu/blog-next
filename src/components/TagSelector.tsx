import { TagInfo } from "@/statics/tag-index";
import TagsBox from "./TagsBox";

export type TagSelectorProps = {
  tags: TagInfo[];
  selectedTagSlug?: string;
};

export default function TagSelector(props: TagSelectorProps) {
  return (
    <div className="p-2">
      <TagsBox tags={props.tags} highlightedTagSlug={props.selectedTagSlug} />
    </div>
  );
}
