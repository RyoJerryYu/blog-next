import { ObsidianCalloutProps } from "@/core/parsing/complex-plugins/obsidian-callout/types";
import {
  Article,
  BugReport,
  CheckCircle,
  Checklist,
  Close,
  Code,
  FormatQuote,
  Info,
  KeyboardArrowRight,
  Lightbulb,
  Note,
  QuestionMark,
  Warning,
} from "@mui/icons-material";
import clsx from "clsx";
import { useState } from "react";

type CalloutTypeFeature = {
  icon: React.ReactNode;
  bgColor: string;
  titleColor: string;
};

const defaultCalloutTypeFeature: CalloutTypeFeature = {
  icon: <Note />,
  bgColor: "bg-sky-100",
  titleColor: "text-sky-600",
};

const calloutTypeFeatures: Record<string, CalloutTypeFeature> = {
  note: {
    icon: <Note />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-600",
  },
  abstract: {
    icon: <Article />,
    bgColor: "bg-teal-100",
    titleColor: "text-teal-600",
  },
  info: {
    icon: <Info />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-600",
  },
  todo: {
    icon: <Checklist />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-600",
  },
  tip: {
    icon: <Lightbulb />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-600",
  },
  success: {
    icon: <CheckCircle />,
    bgColor: "bg-green-100",
    titleColor: "text-green-600",
  },
  question: {
    icon: <QuestionMark />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-600",
  },
  warning: {
    icon: <Warning />,
    bgColor: "bg-orange-100",
    titleColor: "text-orange-600",
  },
  failure: {
    icon: <Close />,
    bgColor: "bg-red-100",
    titleColor: "text-red-600",
  },
  danger: {
    icon: <Warning />,
    bgColor: "bg-red-100",
    titleColor: "text-red-600",
  },
  bug: {
    icon: <BugReport />,
    bgColor: "bg-red-100",
    titleColor: "text-red-600",
  },
  example: {
    icon: <Code />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-600",
  },
  quote: {
    icon: <FormatQuote />,
    bgColor: "bg-sky-100",
    titleColor: "text-sky-600",
  },
};

// feature between foldable and un-foldable callout
type FoldableFeature = {
  onClick: () => void;
  titleClassName: string;
  arrowIcon?: React.ReactNode;
};

export const ObsidianCallout = (props: ObsidianCalloutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(props.foldable);

  const calloutTypeFeature =
    calloutTypeFeatures[props.type] || defaultCalloutTypeFeature;

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
    <div className={clsx("rounded-md p-2 mb-2", calloutTypeFeature.bgColor)}>
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
