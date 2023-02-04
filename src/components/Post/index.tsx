import style from "./Post.module.scss";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import License from "../License";
import RelativeTime from "../RelativeTime";
import clsx from "clsx";
import TagsBox from "../TagsBox";
import { PostMeta } from "@/statics/loader";

type PostProps = {
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
};

const Post = ({ meta, source }: PostProps) => {
  return (
    <article className={style.post}>
      <h1 className={style.postTitle}>{meta.title}</h1>
      <RelativeTime className={style.postDate}>{meta.created_at}</RelativeTime>
      {meta.tags.length > 0 && <TagsBox className="mt-2" tags={meta.tags} />}

      <div className={clsx("post-body", style.postContent)}>
        <MDXRemote {...source} />
      </div>
      {meta.license && <License />}
      {meta.tags.length > 0 && <TagsBox className="mt-4" tags={meta.tags} />}
    </article>
  );
};

export default Post;
