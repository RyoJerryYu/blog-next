import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import clsx from "clsx";
import Link from "next/link";
import style from "./TagsBox.module.scss";

type TagsBoxProps = {
  className?: string;
  tags: TagInfo[];
  highlightedTagSlug?: string;
};

const TagsBox: React.FC<TagsBoxProps> = (props: TagsBoxProps) => {
  const renderTag = (tagInfo: TagInfo) => {
    const tagBoxBody =
      props.highlightedTagSlug === tagInfo.slug ? (
        <div className={clsx(style.highlightedTag, "tag-word")}>#{tagInfo.tag}</div>
      ) : (
        <div className={clsx(style.tag, "tag-word")}>#{tagInfo.tag}</div>
      );

    if (tagInfo.path) {
      return (
        <Link key={tagInfo.slug} href={tagInfo.path}>
          {tagBoxBody}
        </Link>
      );
    }
    return <div key={tagInfo.slug}>{tagBoxBody}</div>;
  };

  return (
    <>
      <div className={clsx(style.tagsBox, props.className)}>
        {props.tags.map((tagInfo) => renderTag(tagInfo))}
      </div>
    </>
  );
};
export default TagsBox;
