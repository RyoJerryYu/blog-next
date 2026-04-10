import { useWikilinkPreviewMap } from "@/components-parsing/wikilink-preview-context";
import { ObsidianWikilinkProps } from "@/core/parsing/complex-plugins/obsidian-wikilink/types";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

export const ObsidianWikilinkPreview = (props: ObsidianWikilinkProps) => {
  const theme = useTheme();
  const previewMap = useWikilinkPreviewMap();
  const normalizedPath = props.path.split("#")[0];
  const preview = previewMap[normalizedPath];

  const link = <Link href={props.path}>{props.label}</Link>;
  if (!preview) {
    return link;
  }

  return (
    <Tooltip
      arrow
      placement="top"
      enterDelay={700}
      leaveDelay={100}
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: theme.palette.bg.focus,
            color: theme.palette.fg.main,
            border: `1px solid ${theme.palette.border.main}`,
            maxWidth: 560,
            boxShadow: 2,
            px: 2,
            py: 1.5,
            "& a": {
              color: theme.palette.link,
            },
          },
        },
        arrow: {
          sx: {
            color: theme.palette.bg.focus,
          },
        },
      }}
      title={
        <Box
          className="post-body"
          sx={{
            maxWidth: 460,
            mb: 0,
            color: "inherit",
            fontSize: "1rem",
            lineHeight: "1.75rem",
          }}
        >
          <Typography sx={{ fontWeight: 700, color: "inherit" }}>
            {preview.title}
          </Typography>
          {preview.updatedAt && (
            <Typography variant="caption" sx={{ opacity: 0.85, color: "inherit" }}>
              更新于 {preview.updatedAt.slice(0, 10)}
            </Typography>
          )}
          {preview.abstract && (
            <Box sx={{ mt: 1 }}>
              <MDXRemote {...preview.abstract.source} />
            </Box>
          )}
        </Box>
      }
    >
      <span>{link}</span>
    </Tooltip>
  );
};
