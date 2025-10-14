"use client";
import { langAlias, langs } from "@/grammars";
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
        theme="plastic"
        customLanguages={langs}
        langAlias={langAlias}
        addDefaultStyles
      >
        {props.children}
      </ShikiHighlighter>
    </Box>
  );
};
