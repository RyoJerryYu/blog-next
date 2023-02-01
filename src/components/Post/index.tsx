import style from "./Post.module.scss";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import License from "../License";
import RelativeTime from "../RelativeTime";
import clsx from "clsx";
import TagsBox from "../TagsBox";

type PostProps = {
  title: string;
  length: number;
  date: string;
  license: boolean;
  tags?: string[];
  source: MDXRemoteSerializeResult;
};

const Post = (props: PostProps) => {
  return (
    <article className={style.post}>
      <h1 className={style.postTitle}>{props.title}</h1>
      <RelativeTime className={style.postDate}>{props.date}</RelativeTime>
      {props.tags && props.tags.length > 0 && (
        <TagsBox className="mt-2" tags={props.tags} />
      )}

      <div className={clsx("post-body", style.postContent)}>
        <MDXRemote {...props.source} />
      </div>
      {props.license && <License />}
      {props.tags && props.tags.length > 0 && (
        <TagsBox className="mt-4" tags={props.tags} />
      )}
    </article>
  );
};

export default Post;
