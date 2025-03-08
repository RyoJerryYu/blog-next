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
import clsx from "clsx";
import { useState } from "react";

type CalloutTypeFeature = {
  icon: React.ReactNode;
  bgColor: string;
  titleColor: string;
};

const defaultCalloutTypeFeature: CalloutTypeFeature = {
  icon: <EditOutlined />,
  bgColor: "bg-sky-100",
  titleColor: "text-sky-500",
};

const calloutTypeFeatures: Record<string, CalloutTypeFeature> = {
  note: {
    icon: <EditOutlined />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-500",
  },
  abstract: {
    icon: <AssignmentOutlined />,
    bgColor: "bg-teal-100",
    titleColor: "text-teal-500",
  },
  info: {
    icon: <InfoOutlined />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-500",
  },
  todo: {
    icon: <TaskAltOutlined />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-500",
  },
  tip: {
    icon: <LightbulbOutlined />,
    bgColor: "bg-teal-100",
    titleColor: "text-teal-500",
  },
  success: {
    icon: <CheckOutlined />,
    bgColor: "bg-green-100",
    titleColor: "text-green-500",
  },
  question: {
    icon: <HelpOutlineOutlined />,
    bgColor: "bg-amber-100",
    titleColor: "text-amber-500",
  },
  warning: {
    icon: <WarningAmberOutlined />,
    bgColor: "bg-orange-100",
    titleColor: "text-orange-500",
  },
  failure: {
    icon: <CloseOutlined />,
    bgColor: "bg-red-100",
    titleColor: "text-red-500",
  },
  danger: {
    icon: <OfflineBoltOutlined />,
    bgColor: "bg-red-100",
    titleColor: "text-red-500",
  },
  bug: {
    icon: <BugReportOutlined />,
    bgColor: "bg-red-100",
    titleColor: "text-red-500",
  },
  example: {
    icon: <ListOutlined />,
    bgColor: "bg-indigo-100",
    titleColor: "text-indigo-500",
  },
  quote: {
    icon: <FormatQuoteOutlined />,
    bgColor: "bg-zinc-100",
    titleColor: "text-zinc-500",
  },

  // custom callout types
  reasoning: {
    // for ai conversation llm reasoning
    icon: <PsychologyOutlined />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-500",
  },
  query: {
    // for ai conversation user query
    icon: <HelpOutlineOutlined />,
    bgColor: "bg-fuchsia-100",
    titleColor: "text-fuchsia-500",
  },
  ai: {
    // for ai generated content
    icon: <SmartToyOutlined />,
    bgColor: "bg-indigo-100",
    titleColor: "text-indigo-500",
  },
  think: {
    // further thinking by writer
    icon: <TipsAndUpdatesOutlined />,
    bgColor: "bg-violet-100",
    titleColor: "text-violet-500",
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
  titleClassName: string;
  arrowIcon?: React.ReactNode;
};

export const ObsidianCallout = (props: ObsidianCalloutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(props.foldable);

  const calloutType = calloutTypeAlias[props.type] || props.type;

  const calloutTypeFeature =
    calloutTypeFeatures[calloutType] || defaultCalloutTypeFeature;

  let foldableFeature: FoldableFeature = {
    onClick: () => {},
    titleClassName: "",
  };
  if (props.foldable) {
    foldableFeature = {
      onClick: () => setIsCollapsed((prev) => !prev),
      titleClassName: "cursor-pointer",
      arrowIcon: (
        <KeyboardArrowRight className={clsx(!isCollapsed && "rotate-90")} />
      ),
    };
  }

  // if no title, use CamelCase of type
  const title = props.title
    ? props.title
    : props.type.charAt(0).toUpperCase() + props.type.slice(1);

  return (
    <div className={clsx("rounded-md p-2 my-4", calloutTypeFeature.bgColor)}>
      <div
        onClick={foldableFeature.onClick}
        className={clsx(
          "text-base font-bold",
          calloutTypeFeature.titleColor,
          foldableFeature.titleClassName
        )}
      >
        {calloutTypeFeature.icon} {title} {foldableFeature.arrowIcon}
      </div>
      {props.children && (
        <div className={clsx("m-2", isCollapsed && "hidden")}>
          {props.children}
        </div>
      )}
    </div>
  );
};
