import clsx from "clsx";
import Link from "next/link";
import style from "./TagsBox.module.scss";

type TagsBoxProps = {
  className?: string;
  tags: string[];
};

const TagsBox: React.FC<TagsBoxProps> = ({ className, tags }) => {
  return (
    <>
      <div className={clsx(style.tagsBox, className)}>
        {tags.map((tag) => (
          <Link key={tag} href={`/tag/${tag}`}>
            <span className={style.tag}>{tag}</span>
          </Link>
        ))}
      </div>
    </>
  );
};
export default TagsBox;
