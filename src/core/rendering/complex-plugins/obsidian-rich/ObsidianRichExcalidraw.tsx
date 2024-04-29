import EmbededExcalidraw from "../../component-plugins/ExcalidrawScene/EmbededExcalidraw";
import { ObsidianRichProps } from "./types";

export const ObsidianRichExcalidraw = (props: ObsidianRichProps) => {
  console.log("ObsidianRichExcalidraw:", props);
  return <EmbededExcalidraw {...props} />;
};
