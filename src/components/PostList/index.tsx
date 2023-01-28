import { PostMatter } from "@/utils/post-matter";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RelativeTime from "../RelativeTime";

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
      <div>
        {postMatter.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      <Link href={url}>
        <h6>{postMatter.title}</h6>
        {postMatter.abstract && postMatter.abstract.length > 0 && (
          <div>{postMatter.abstract}</div>
        )}
      </Link>
      {renderTags()}
      <RelativeTime time={postMatter.created_at} />
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
    <div>
      {elementsProps.map(({ postMatter, url }) => (
        <PostListElement
          key={postMatter.slug}
          postMatter={postMatter}
          url={url}
        />
      ))}
    </div>
  );
}
