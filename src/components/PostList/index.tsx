import { Post } from "@/statics";
import { PostMeta } from "@/statics/loader";
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
          <p key={index} className={style.postAbstract}>
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
};

export function PostListElement({
  className,
  postMeta,
  url,
}: PostListElementProps) {
  const renderTags = () => {
    if (!postMeta.tags || postMeta.tags.length === 0) {
      return null;
    }
    return;
  };

  return (
    <div className={className}>
      <Link href={url}>
        <h6 className={style.postTitle}>{postMeta.title}</h6>
        <RelativeTime className={style.postDate}>
          {postMeta.created_at}
        </RelativeTime>
        {postMeta.abstract && postMeta.abstract.length > 0 && (
          <PostAbstract className={style.postAbstract}>
            {postMeta.abstract}
          </PostAbstract>
        )}
      </Link>
      {postMeta.tags && postMeta.tags.length > 0 && (
        <TagsBox tags={postMeta.tags} />
      )}
    </div>
  );
}

type PostListProps = {
  posts: Post[];
  getUrl?: (post: Post) => string;
};

export default function PostList({ posts, getUrl }: PostListProps) {
  if (posts.length === 0) {
    return <div>No posts</div>;
  }

  const elementsProps = posts.map((post) => {
    const url = getUrl ? getUrl(post) : `/posts/${post.slug}`;
    return {
      post,
      url,
    };
  });

  return (
    <div className={style.postList}>
      {elementsProps.map(({ post, url }) => (
        <PostListElement
          key={post.slug}
          className={style.postListElement}
          postMeta={post.meta}
          url={url}
        />
      ))}
    </div>
  );
}
