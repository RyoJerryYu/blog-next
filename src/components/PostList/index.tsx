import { PostMatter } from "@/utils/post-matter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RelativeTime from "../RelativeTime";
import style from "./PostList.module.scss";

type PostListElementProps = {
  className?: string;
  postMatter: PostMatter;
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
    return (
      <div className={style.postTagsBox}>
        {postMatter.tags.map((tag) => (
          <span key={tag} className={style.postTag}>
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      <Link href={url}>
        <h6 className={style.postTitle}>{postMatter.title}</h6>
        <RelativeTime className={style.postDate}>
          {postMatter.created_at}
        </RelativeTime>
        {postMatter.abstract && postMatter.abstract.length > 0 && (
          <div className={style.postAbstract}>{postMatter.abstract}</div>
        )}
      </Link>
      {renderTags()}
    </div>
  );
}

type PostListProps = {
  postMatters: PostMatter[];
  getUrl?: (post: PostMatter) => string;
};

export default function PostList({ postMatters, getUrl }: PostListProps) {
  if (postMatters.length === 0) {
    return <div>No posts</div>;
  }

  const elementsProps = postMatters.map((post) => {
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
          postMatter={postMatter}
          url={url}
        />
      ))}
    </div>
  );
}
