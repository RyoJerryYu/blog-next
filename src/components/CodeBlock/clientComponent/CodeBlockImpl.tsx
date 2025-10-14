import { Box } from "@mui/material";
import ShikiHighlighter from "react-shiki";
import { CodeBlockProps } from "../types/CodeBlockProps";

export const CodeBlockImpl = (props: CodeBlockProps) => {
  return (
    <Box
      sx={{
        "& .shiki": {
          "border-radius": 0,
        },
      }}
    >
      <ShikiHighlighter
        language={props.language || "plaintext"}
        theme="dark-plus"
      >
        {props.children}
      </ShikiHighlighter>
    </Box>
  );
};
