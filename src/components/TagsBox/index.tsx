import { TagInfo } from "@/statics/tag-index";
import clsx from "clsx";
import Link from "next/link";
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
        {props.tags.map((tagInfo) => (
          <Link key={tagInfo.slug} href={tagInfo.path}>
            {props.highlightedTagSlug === tagInfo.slug ? (
              <div className={style.highlightedTag}>{tagInfo.tag}</div>
            ) : (
              <div className={style.tag}>{tagInfo.tag}</div>
            )}
          </Link>
        ))}
      </div>
    </>
  );
};
export default TagsBox;
