import { PrevNextInfo } from "@/core/indexing/index-building/prev-next-index-builder/types";
import { TagInfo } from "@/core/indexing/index-building/tag-index-builder/types";
import { PostMeta } from "@/core/types/indexing";
import { Box, Divider, Stack, Typography, useTheme } from "@mui/material";
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
  const theme = useTheme();
  return (
    <Box component="article" className="post-frame">
      <Typography variant="h1">{meta.title}</Typography>
      {meta.created_at && (
        <Box
          sx={{
            fontSize: "0.875rem", // text-sm
            lineHeight: "1.25rem", // text-sm line-height
            color: theme.palette.fg.main, // text-slate-700
          }}
        >
          <RelativeTime>{meta.created_at}</RelativeTime>
        </Box>
      )}
      {meta.tags.length > 0 && (
        <Box sx={{ marginTop: "0.5rem" }}>
          <TagsBox tags={tags} />
        </Box>
      )}

      <Box className="post-body">
        <MDXRemote {...source} />
      </Box>
      {meta.license && <License />}
      {meta.tags.length > 0 && (
        <Box sx={{ marginTop: "1rem" }}>
          <TagsBox tags={tags} />
        </Box>
      )}
      {(prevInfo || nextInfo) && (
        <Stack
          direction="row"
          sx={{
            marginTop: "1rem",
            marginBottom: "1rem",
            justifyContent: "center",
          }}
        >
          {prevInfo && (
            <Box sx={{ marginLeft: 0, marginRight: "auto" }}>
              <Link
                href={prevInfo.pathMapping.pagePath}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {`<- ${prevInfo.meta.title}`}
              </Link>
            </Box>
          )}
          {nextInfo && (
            <Box sx={{ marginRight: 0, marginLeft: "auto" }}>
              <Link
                href={nextInfo.pathMapping.pagePath}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {`${nextInfo.meta.title} ->`}
              </Link>
            </Box>
          )}
        </Stack>
      )}
      <Divider sx={{ marginTop: "1rem" }} />
    </Box>
  );
};

export default Post;
