import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { PostMeta, PostResource } from "@/core/types/indexing";
import Link from "next/link";
import React from "react";
import RelativeTime from "../RelativeTime";
import TagsBox from "../TagsBox";
import style from "./PostList.module.scss";

type PostAbstractProps = {
  className?: string;
  children: string;
};
const PostAbstract: React.FC<PostAbstractProps> = ({ className, children }) => {
  const lines = children.split("\n");

  return (
    <div className={className}>
      {lines.map((line, index) => {
        return (
          <p key={index} className="py-1">
            {line}
          </p>
        );
      })}
    </div>
  );
};

type PostListElementProps = {
  className?: string;
  postMeta: PostMeta;
  url: string;
  tags: TagInfo[];
};

export function PostListElement({
  className,
  postMeta,
  url,
  tags,
}: PostListElementProps) {
  return (
    <div className={className}>
      <Link href={url}>
        <h6 className={style.postTitle}>{postMeta.title}</h6>
        {postMeta.created_at && (
          <RelativeTime className={style.postDate}>
            {postMeta.created_at}
          </RelativeTime>
        )}
        {postMeta.abstract && postMeta.abstract.length > 0 && (
          <PostAbstract className={style.postAbstract}>
            {postMeta.abstract}
          </PostAbstract>
        )}
      </Link>
      {postMeta.tags && postMeta.tags.length > 0 && (
        <TagsBox tags={tags} className="py-4 md:py-1" />
      )}
    </div>
  );
}

type PostListProps = {
  posts: PostResource[];
  allTags: Map<string, TagInfo>; // Map<tag, TagInfo>
};

export default function PostList({ posts, allTags }: PostListProps) {
  if (posts.length === 0) {
    return <div>No posts</div>;
  }

  const elementsProps = posts.map((post) => {
    const pagePath = post.pathMapping.pagePath;
    const tags = post.meta.tags.map((tag): TagInfo => {
      const tagInfo = allTags.get(tag);
      if (!tagInfo) {
        return {
          tag: tag,
          slug: tag,
          path: "",
          postSlugs: [],
        };
      }
      return tagInfo;
    });

    return {
      post: post,
      url: pagePath,
      tags: tags,
    };
  });

  return (
    <div className={style.postList}>
      {elementsProps.map(({ post, url, tags }) => (
        <PostListElement
          key={post.pathMapping.pagePath}
          className={style.postListElement}
          postMeta={post.meta}
          tags={tags}
          url={url}
        />
      ))}
    </div>
  );
}
