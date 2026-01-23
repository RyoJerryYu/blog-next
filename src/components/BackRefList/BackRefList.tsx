import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { PostMeta, PostResource } from "@/core/types/indexing";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import TagsBox from "../TagsBox";

type BackRefListElementProps = {
  postMeta: PostMeta;
  url: string;
};

const BackRefListElement = ({ postMeta, url }: BackRefListElementProps) => {
  const theme = useTheme();
  let tags: TagInfo[] = postMeta.tags.map((tag) => {
    return {
      tag: tag,
      slug: tag,
      path: "",
      postSlugs: [],
    };
  });
  if (tags.length > 0) {
    tags = tags.slice(0, 3);
  }
  return (
    <Box
      sx={{
        flex: 1, // flex-1
        padding: "0.5rem", // p-2
        borderRadius: "0.375rem", // rounded-md
        "&:hover": {
          backgroundColor: theme.palette.bg.focus, // hover:bg-bg-focus
        },
      }}
    >
      <Link href={url} style={{ textDecoration: "none", color: "inherit" }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            display: "flex", // flex items-center
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.125rem", // text-lg
              lineHeight: "1.75rem", // text-lg line-height
              flexGrow: 1, // flex-grow
              height: "fit-content", // h-fit
              overflow: "hidden", // overflow-ellipsis
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {postMeta.title}
          </Typography>
          <TagsBox
            tags={tags}
            sx={{
              paddingTop: { xs: "1rem", md: "0.25rem" }, // py-4 md:py-1
              paddingBottom: { xs: "1rem", md: "0.25rem" },
              flex: "none", // flex-none
            }}
          />
        </Stack>
      </Link>
    </Box>
  );
};

export type BackRefListProps = {
  posts: PostResource[];
};

export default function BackRefList({ posts }: BackRefListProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontSize: "1.5rem", // text-2xl
          lineHeight: "2rem", // text-2xl line-height
          fontWeight: 700, // font-bold
          paddingTop: "1rem", // pt-4
        }}
      >
        反向引用
      </Typography>
      {posts.map((post) => (
        <BackRefListElement
          key={post.pathMapping.pagePath}
          postMeta={post.meta}
          url={post.pathMapping.pagePath}
        />
      ))}
      <Divider sx={{ marginTop: "1rem" }} /> {/* mt-4 */}
    </Box>
  );
}
