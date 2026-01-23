import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { PostMeta, PostResource } from "@/core/types/indexing";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";
import RelativeTime from "../RelativeTime";
import TagsBox from "../TagsBox";

type PostAbstractProps = {
  children: string;
};
const PostAbstract: React.FC<PostAbstractProps> = ({ children }) => {
  const lines = children.split("\n");

  return (
    <Box>
      {lines.map((line, index) => {
        return (
          <Typography
            key={index}
            variant="body2"
            sx={{
              py: 0.5, // py-1 = 0.25rem = 0.5 * theme.spacing(1)
              lineHeight: 1.375, // leading-snug
              overflow: "hidden",
            }}
          >
            {line}
          </Typography>
        );
      })}
    </Box>
  );
};

type PostListElementProps = {
  postMeta: PostMeta;
  url: string;
  tags: TagInfo[];
};

export function PostListElement({ postMeta, url, tags }: PostListElementProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        p: 1, // p-2 = 0.5rem = 1 * theme.spacing(1)
        borderRadius: 1, // rounded-md = 0.375rem
        "&:hover": {
          backgroundColor: theme.palette.bg.focus, // hover:bg-bg-focus
        },
      }}
    >
      <Link href={url}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.25rem", // text-xl
            fontWeight: "bold",
          }}
        >
          {postMeta.title}
        </Typography>
        {postMeta.created_at && (
          <Box
            sx={{
              fontSize: "0.75rem", // text-xs
              color: theme.palette.fg.light, // text-fg-light
              width: "100%",
            }}
          >
            <RelativeTime>{postMeta.created_at}</RelativeTime>
          </Box>
        )}
        {postMeta.abstract && postMeta.abstract.length > 0 && (
          <Box
            sx={{
              fontSize: "0.875rem", // text-sm
            }}
          >
            <PostAbstract>{postMeta.abstract}</PostAbstract>
          </Box>
        )}
      </Link>
      {postMeta.tags && postMeta.tags.length > 0 && (
        <Box
          sx={{
            py: { xs: 2, md: 0.5 }, // py-4 md:py-1
          }}
        >
          <TagsBox tags={tags} />
        </Box>
      )}
    </Box>
  );
}

type PostListProps = {
  posts: PostResource[];
  allTags: Map<string, TagInfo>; // Map<tag, TagInfo>
};

export default function PostList({ posts, allTags }: PostListProps) {
  if (posts.length === 0) {
    return <Box>No posts</Box>;
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
    <Stack
      direction="column"
      spacing={{ xs: 2, md: 0 }} // gap-4 md:gap-0
    >
      {elementsProps.map(({ post, url, tags }) => (
        <PostListElement
          key={post.pathMapping.pagePath}
          postMeta={post.meta}
          tags={tags}
          url={url}
        />
      ))}
    </Stack>
  );
}
