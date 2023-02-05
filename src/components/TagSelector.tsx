import { TagInfo } from "@/statics/tag-index";
import TagsBox from "./TagsBox";

export type TagSelectorProps = {
  tags: TagInfo[];
  selectedTag?: string;
};

export default function TagSelector(props: TagSelectorProps) {
  return (
    <div className="p-2">
      <TagsBox tags={props.tags} />
    </div>
  );
}
