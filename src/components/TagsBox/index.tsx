import { TagInfo } from "@/statics/tag-index";
import clsx from "clsx";
import Link from "next/link";
import style from "./TagsBox.module.scss";

type TagsBoxProps = {
  className?: string;
  tags: TagInfo[];
};

const TagsBox: React.FC<TagsBoxProps> = ({ className, tags }) => {
  return (
    <>
      <div className={clsx(style.tagsBox, className)}>
        {tags.map((tagInfo) => (
          <Link key={tagInfo.slug} href={tagInfo.path}>
            <span className={style.tag}>{tagInfo.tag}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
export default TagsBox;
