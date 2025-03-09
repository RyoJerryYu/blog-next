import { ObsidianTagProps } from "@/core/parsing/complex-plugins/obsidian-tag/types";
import Link from "next/link";
import styles from "./ObsidianTag.module.scss";
export const ObsidianTag = (props: ObsidianTagProps) => {
  if (props.slug && props.path) {
    return (
      <Link href={props.path} className={styles.obsidianTag}>
        #{props.tag}
      </Link>
    );
  }
  return <span className={styles.obsidianTag}>#{props.tag}</span>;
};
