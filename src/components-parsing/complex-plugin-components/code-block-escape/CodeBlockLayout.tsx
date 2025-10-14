import CodeBlock from "@/components/CodeBlock";
import { CodeBlockProps } from "@/core/parsing/complex-plugins/code-block-escape/types";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";

type CodeBlockLayoutProps = CodeBlockProps & {
  children: React.ReactNode;
};

export const CodeBlockLayout = (props: CodeBlockLayoutProps) => {
  const [view, setView] = useState<"preview" | "code">("preview");
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: "100%" }}>
        <Tabs value={view} onChange={(_, value) => setView(value)}>
          <Tab label="Preview" value="preview" />
          <Tab label="Code" value="code" />
        </Tabs>
        <Box
          sx={{
            maxWidth: "800px",
            width: "100%",
            height: "100%",
            maxHeight: "800px",
          }}
        >
          {view === "preview" ? (
            props.children
          ) : (
            <CodeBlock language={props.lang ?? undefined}>
              {props.value}
            </CodeBlock>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
