import { Page } from "@/statics";
import { PostMeta } from "@/statics/utils";
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
  postMatter: PostMeta;
  url: string;
};

export function PostListElement({
  className,
  postMatter,
  url,
}: PostListElementProps) {
  const renderTags = () => {
    if (!postMatter.tags || postMatter.tags.length === 0) {
      return null;
    }
    return;
  };

  return (
    <div className={className}>
      <Link href={url}>
        <h6 className={style.postTitle}>{postMatter.title}</h6>
        <RelativeTime className={style.postDate}>
          {postMatter.created_at}
        </RelativeTime>
        {postMatter.abstract && postMatter.abstract.length > 0 && (
          <PostAbstract className={style.postAbstract}>
            {postMatter.abstract}
          </PostAbstract>
        )}
      </Link>
      {postMatter.tags && postMatter.tags.length > 0 && (
        <TagsBox tags={postMatter.tags} />
      )}
    </div>
  );
}

type PostListProps = {
  posts: Page[];
  getUrl?: (post: Page) => string;
};

export default function PostList({ posts, getUrl }: PostListProps) {
  if (posts.length === 0) {
    return <div>No posts</div>;
  }

  const elementsProps = posts.map((post) => {
    const url = getUrl ? getUrl(post) : `/posts/${post.slug}`;
    return {
      postMatter: post,
      url,
    };
  });

  return (
    <div className={style.postList}>
      {elementsProps.map(({ postMatter, url }) => (
        <PostListElement
          key={postMatter.slug}
          className={style.postListElement}
          postMatter={postMatter.matter}
          url={url}
        />
      ))}
    </div>
  );
}
