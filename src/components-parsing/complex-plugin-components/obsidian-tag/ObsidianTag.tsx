import { ObsidianTagProps } from "@/core/parsing/complex-plugins/obsidian-tag/types";
import styles from "./ObsidianTag.module.scss";
export const ObsidianTag = (props: ObsidianTagProps) => {
  return (
    <>
      <span className={styles.obsidianTag}>#{props.tag}</span>
    </>
  );
};
