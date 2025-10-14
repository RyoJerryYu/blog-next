import CodeBlock from "@/components/CodeBlock";
import { CodeBlockProps } from "@/core/parsing/complex-plugins/code-block-escape/types";
import { Box, Paper, styled, Tab, Tabs } from "@mui/material";
import { useState } from "react";

type CodeBlockLayoutProps = CodeBlockProps & {
  children: React.ReactNode;
};

const CodeBlockTabs = styled(Tabs)(({ theme }) => ({
  backgroundColor: theme.palette.codeblock.darkBg,
  minHeight: theme.spacing(1),

  "& .MuiTabs-indicator": {
    backgroundColor: theme.palette.codeblock.selectedText,
  },
}));
const CodeBlockTab = styled(Tab)(({ theme }) => {
  const paddingX = theme.spacing(1);
  const paddingY = theme.spacing(1);
  return {
    paddingTop: paddingY,
    paddingBottom: paddingY,
    paddingLeft: paddingX,
    paddingRight: paddingX,
    minHeight: theme.spacing(1),
    textTransform: "none",

    color: theme.palette.codeblock.text,

    "&.Mui-selected": {
      backgroundColor: theme.palette.codeblock.bg,
      color: theme.palette.codeblock.selectedText,
    },
  };
});

export const CodeBlockLayout = (props: CodeBlockLayoutProps) => {
  const [view, setView] = useState<"preview" | "code">("preview");
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Paper
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          width: "100%",
          maxWidth: "800px",
          height: "100%",
          maxHeight: "800px",
        }}
      >
        <CodeBlockTabs
          value={view}
          onChange={(_, value) => setView(value)}
          sx={{ overflow: "auto" }}
        >
          <CodeBlockTab label="Preview" value="preview" />
          <CodeBlockTab label="Code" value="code" />
        </CodeBlockTabs>
        {view === "preview" ? (
          <Box>{props.children}</Box>
        ) : (
          <Box
            sx={{
              overflow: "auto",
            }}
          >
            <CodeBlock language={props.lang ?? undefined}>
              {props.value}
            </CodeBlock>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
