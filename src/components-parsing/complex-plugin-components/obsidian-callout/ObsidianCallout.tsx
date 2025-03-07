import { ObsidianCalloutProps } from "@/core/parsing/complex-plugins/obsidian-callout/types";
import { KeyboardArrowRight } from "@mui/icons-material";
import clsx from "clsx";
import { useState } from "react";

// feature between foldable and un-foldable callout
type FoldableFeature = {
  onClick: () => void;
  titleClassName: string;
  arrowIcon?: React.ReactNode;
};

export const ObsidianCallout = (props: ObsidianCalloutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(props.foldable);

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
    <div className="border border-gray-200 rounded-md bg-orange-50 p-2 mb-2">
      <div
        onClick={foldableFeature.onClick}
        className={clsx(
          "text-lg font-bold text-orange-500",
          foldableFeature.titleClassName
        )}
      >
        {"🔍 "} {title} {foldableFeature.arrowIcon}
      </div>
      {props.children && (
        <div className={clsx("m-2", isCollapsed && "hidden")}>
          {props.children}
        </div>
      )}
    </div>
  );
};
