import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder/types";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { PostMeta } from "@/core/types/indexing";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import License from "../License";
import RelativeTime from "../RelativeTime";
import TagsBox from "../TagsBox";

type PostProps = {
  source: MDXRemoteSerializeResult;
  meta: PostMeta;
  tags: TagInfo[];
  prevNextInfo: PrevNextInfo;
};

const Post = ({ meta, source, tags, prevNextInfo }: PostProps) => {
  const { prevInfo, nextInfo } = prevNextInfo;
  return (
    <article className="post-frame">
      <h1>{meta.title}</h1>
      {meta.created_at && (
        <div className="text-sm text-slate-700">
          <RelativeTime>{meta.created_at}</RelativeTime>
        </div>
      )}
      {meta.tags.length > 0 && <TagsBox className="mt-2" tags={tags} />}

      <div className="post-body">
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
