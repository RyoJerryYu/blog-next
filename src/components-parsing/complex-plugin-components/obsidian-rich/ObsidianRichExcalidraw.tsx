import EmbededExcalidraw from "@/components/ExcalidrawScene/EmbededExcalidraw";
import { ObsidianRichProps } from "../../../core/parsing/complex-plugins/obsidian-rich/types";

export const ObsidianRichExcalidraw = (props: ObsidianRichProps) => {
  console.log("ObsidianRichExcalidraw:", props);
  return <EmbededExcalidraw {...props} />;
};
