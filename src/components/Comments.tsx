import useScript from "@/hooks/use-script";
import { Box } from "@mui/material";
import { useRef } from "react";

export type CommentsProps = {
  theme?: string;
  "issue-term"?: string;
  repo?: string;
  label?: string;
};

const Comments = (props?: CommentsProps) => {
  const comment = useRef(null);

  const status = useScript({
    url: "https://utteranc.es/client.js",
    attributes: {
      theme: props?.theme ?? "github-light",
      "issue-term": props?.["issue-term"] ?? "pathname",
      repo: props?.repo ?? "RyoJerryYu/blog-next",
      label: props?.label ?? "comment",
    },
    ref: comment,
  });

  return (
    <Box sx={{ width: "100%" }}>
      <div ref={comment} />
      {status === "loading" && (
        <Box sx={{ textAlign: "center" }}>Loading comments...</Box>
      )}
      {status === "error" && (
        <Box
          sx={{
            textAlign: "center", // text-center
            color: "rgb(239, 68, 68)", // text-red-500
          }}
        >
          Error loading comments. Please try again later.
        </Box>
      )}
    </Box>
  );
};

export default Comments;
