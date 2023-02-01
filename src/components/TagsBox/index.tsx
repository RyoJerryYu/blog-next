import Link from "next/link";
import style from "./TagsBox.module.scss";

type TagsBoxProps = {
  tags: string[];
};

const TagsBox: React.FC<TagsBoxProps> = ({ tags }) => {
  return (
    <>
      <div className={style.tagsBox}>
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
