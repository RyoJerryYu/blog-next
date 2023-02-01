import style from "./Post.module.scss";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import License from "../License";
import RelativeTime from "../RelativeTime";
import clsx from "clsx";

type PostProps = {
  title: string;
  length: number;
  date: string;
  license: boolean;
  source: MDXRemoteSerializeResult;
};

const Post = (props: PostProps) => {
  return (
    <article className={style.post}>
      <h1 className={style.postTitle}>{props.title}</h1>
      <RelativeTime className={style.postDate}>{props.date}</RelativeTime>

      <div className={clsx("post-body", style.postContent)}>
        <MDXRemote {...props.source} />
      </div>
      {props.license && <License />}
    </article>
  );
};

export default Post;
