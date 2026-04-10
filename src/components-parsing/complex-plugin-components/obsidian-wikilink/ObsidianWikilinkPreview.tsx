import { useWikilinkPreviewMap } from "@/components-parsing/wikilink-preview-context";
import { ObsidianWikilinkProps } from "@/core/parsing/complex-plugins/obsidian-wikilink/types";
import { Box, Tooltip, Typography } from "@mui/material";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

export const ObsidianWikilinkPreview = (props: ObsidianWikilinkProps) => {
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
      title={
        <Box sx={{ maxWidth: 420, py: 0.5 }}>
          <Typography sx={{ fontWeight: 700 }}>{preview.title}</Typography>
          {preview.updatedAt && (
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              更新于 {preview.updatedAt.slice(0, 10)}
            </Typography>
          )}
          {preview.abstract && (
            <Box sx={{ mt: 1, "& p": { my: 0.5 } }}>
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
