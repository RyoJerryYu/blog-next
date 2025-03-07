import { ObsidianCalloutProps } from "@/core/parsing/complex-plugins/obsidian-callout/types";

export const ObsidianCallout = (props: ObsidianCalloutProps) => {
  return (
    <div>
      Type: {props.type}
      Foldable: {props.foldable ? "true" : "false"}
      Title: {props.title}
      {props.children}
      <br />
    </div>
  );
};
