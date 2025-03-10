import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import clsx from "clsx";
import { Tag } from "../Tag";
import style from "./TagsBox.module.scss";

type TagsBoxProps = {
  className?: string;
  tags: TagInfo[];
  highlightedTagSlug?: string;
};

const TagsBox: React.FC<TagsBoxProps> = (props: TagsBoxProps) => {
  return (
    <>
      <div className={clsx(style.tagsBox, props.className)}>
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
      </div>
    </>
  );
};
export default TagsBox;
