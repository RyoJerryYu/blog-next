import { ObsidianCalloutProps } from "@/core/parsing/complex-plugins/obsidian-callout/types";
import {
  AssignmentOutlined,
  BugReportOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FormatQuoteOutlined,
  HelpOutlineOutlined,
  InfoOutlined,
  KeyboardArrowRight,
  LightbulbOutlined,
  ListOutlined,
  OfflineBoltOutlined,
  PsychologyOutlined,
  SmartToyOutlined,
  TaskAltOutlined,
  TipsAndUpdatesOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";

type CalloutColorKey = "sky" | "teal" | "green" | "amber" | "orange" | "red" | "indigo" | "zinc" | "fuchsia" | "violet";

type CalloutTypeFeature = {
  icon: React.ReactNode;
  colorKey: CalloutColorKey;
};

const defaultCalloutTypeFeature: CalloutTypeFeature = {
  icon: <EditOutlined />,
  colorKey: "sky",
};

const calloutTypeFeatures: Record<string, CalloutTypeFeature> = {
  note: {
    icon: <EditOutlined />,
    colorKey: "sky",
  },
  abstract: {
    icon: <AssignmentOutlined />,
    colorKey: "teal",
  },
  info: {
    icon: <InfoOutlined />,
    colorKey: "sky",
  },
  todo: {
    icon: <TaskAltOutlined />,
    colorKey: "sky",
  },
  tip: {
    icon: <LightbulbOutlined />,
    colorKey: "teal",
  },
  success: {
    icon: <CheckOutlined />,
    colorKey: "green",
  },
  question: {
    icon: <HelpOutlineOutlined />,
    colorKey: "amber",
  },
  warning: {
    icon: <WarningAmberOutlined />,
    colorKey: "orange",
  },
  failure: {
    icon: <CloseOutlined />,
    colorKey: "red",
  },
  danger: {
    icon: <OfflineBoltOutlined />,
    colorKey: "red",
  },
  bug: {
    icon: <BugReportOutlined />,
    colorKey: "red",
  },
  example: {
    icon: <ListOutlined />,
    colorKey: "indigo",
  },
  quote: {
    icon: <FormatQuoteOutlined />,
    colorKey: "zinc",
  },

  // custom callout types
  reasoning: {
    // for ai conversation llm reasoning
    icon: <PsychologyOutlined />,
    colorKey: "sky",
  },
  query: {
    // for ai conversation user query
    icon: <HelpOutlineOutlined />,
    colorKey: "fuchsia",
  },
  ai: {
    // for ai generated content
    icon: <SmartToyOutlined />,
    colorKey: "indigo",
  },
  think: {
    // further thinking by writer
    icon: <TipsAndUpdatesOutlined />,
    colorKey: "violet",
  },
};

const calloutTypeAlias: Record<string, keyof typeof calloutTypeFeatures> = {
  summary: "abstract",
  tldr: "abstract",
  hint: "tip",
  important: "tip",
  check: "success",
  done: "success",
  help: "question",
  faq: "question",
  caution: "warning",
  attention: "warning",
  fail: "failure",
  missing: "failure",
  error: "danger",
  cite: "quote",
  idea: "think",
};

// feature between foldable and un-foldable callout
type FoldableFeature = {
  onClick: () => void;
  cursorPointer: boolean;
  arrowIcon?: React.ReactNode;
};

export const ObsidianCallout = (props: ObsidianCalloutProps) => {
  const theme = useTheme();
  // default to collapsed only when foldable and isCollapsed
  const [isCollapsed, setIsCollapsed] = useState(
    props.foldable && props.isCollapsed
  );

  const calloutType = calloutTypeAlias[props.type] || props.type;

  const calloutTypeFeature =
    calloutTypeFeatures[calloutType] || defaultCalloutTypeFeature;

  const calloutColors = theme.palette.callout[calloutTypeFeature.colorKey];

  let foldableFeature: FoldableFeature = {
    onClick: () => {},
    cursorPointer: false,
  };
  if (props.foldable) {
    foldableFeature = {
      onClick: () => setIsCollapsed((prev) => !prev),
      cursorPointer: true,
      arrowIcon: (
        <KeyboardArrowRight
          sx={{
            transform: isCollapsed ? "rotate(0deg)" : "rotate(90deg)", // rotate-90
            transition: "transform 0.2s",
          }}
        />
      ),
    };
  }

  // if no title, use CamelCase of type
  const title = props.title
    ? props.title
    : props.type.charAt(0).toUpperCase() + props.type.slice(1);

  return (
    <Box
      sx={{
        borderRadius: "0.375rem", // rounded-md
        padding: "0.5rem", // p-2
        marginTop: "1rem", // my-4
        marginBottom: "1rem",
        backgroundColor: calloutColors.bg, // bgColor from theme
      }}
    >
      <Box
        onClick={foldableFeature.onClick}
        sx={{
          fontSize: "1rem", // text-base
          lineHeight: "1.5rem", // text-base line-height
          fontWeight: 700, // font-bold
          color: calloutColors.title, // titleColor from theme
          cursor: foldableFeature.cursorPointer ? "pointer" : "default", // cursor-pointer
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {calloutTypeFeature.icon} {title} {foldableFeature.arrowIcon}
      </Box>
      {props.children && !isCollapsed && (
        <Box sx={{ margin: "0.5rem" }}>{props.children}</Box> // m-2
      )}
    </Box>
  );
};
