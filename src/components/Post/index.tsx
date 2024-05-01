import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder/types";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { PostMeta } from "@/core/types/indexing";
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
        <div className="mt-4 mb-4 flex justify-center">
          {prevInfo && (
            <div className="ml-0 mr-auto">
              <Link
                href={prevInfo.pathMapping.pagePath}
              >{`<- ${prevInfo.meta.title}`}</Link>
            </div>
          )}
          {nextInfo && (
            <div className="mr-0 ml-auto">
              <Link
                href={nextInfo.pathMapping.pagePath}
              >{`${nextInfo.meta.title} ->`}</Link>
            </div>
          )}
        </div>
      )}
      <hr className="mt-4" />
    </article>
  );
};

export default Post;
