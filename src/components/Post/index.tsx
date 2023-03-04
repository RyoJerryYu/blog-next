import { PrevNextInfo } from "@/statics";
import { PostMeta } from "@/statics/loader";
import { TagInfo } from "@/statics/tag-index";
import clsx from "clsx";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import License from "../License";
import RelativeTime from "../RelativeTime";
import TagsBox from "../TagsBox";
import style from "./Post.module.scss";

type PostProps = {
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
  tags: TagInfo[];
  prevNextInfo: PrevNextInfo;
};

const Post = ({ meta, source, tags, prevNextInfo }: PostProps) => {
  const { prevInfo, nextInfo } = prevNextInfo;
  return (
    <article className={style.post}>
      <h1 className={style.postTitle}>{meta.title}</h1>
      {meta.created_at && (
        <RelativeTime className={style.postDate}>
          {meta.created_at}
        </RelativeTime>
      )}
      {meta.tags.length > 0 && <TagsBox className="mt-2" tags={tags} />}

      <div className={clsx("post-body", style.postContent)}>
        <MDXRemote {...source} />
      </div>
      {meta.license && <License />}
      {meta.tags.length > 0 && <TagsBox className="mt-4" tags={tags} />}
      {(prevInfo || nextInfo) && (
        <div className="mt-4 flex justify-center">
          {prevInfo && (
            <div className="ml-0 mr-auto">
              <Link href={prevInfo.path}>{`<- ${prevInfo.title}`}</Link>
            </div>
          )}
          {nextInfo && (
            <div className="mr-0 ml-auto">
              <Link href={nextInfo.path}>{`${nextInfo.title} ->`}</Link>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default Post;
