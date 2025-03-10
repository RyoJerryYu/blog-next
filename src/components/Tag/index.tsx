import clsx from "clsx";
import Link from "next/link";

type TagProps = {
  tag: string;
  slug?: string;
  path?: string;
  className?: string;
};

export const Tag = (props: TagProps) => {
  if (props.slug && props.path) {
    return (
      <Link href={props.path} className={clsx("tag-word", props.className)}>
        #{props.tag}
      </Link>
    );
  }
  return (
    <span className={clsx("tag-word", props.className)}>#{props.tag}</span>
  );
};
