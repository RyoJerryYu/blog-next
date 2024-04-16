import { dynamicLoading } from "../Loading/dynamic-loading";
import { ExcalidrawSceneProps } from "./ExcalidrawSceneImpl";

const ExcalidrawSceneImpl = dynamicLoading(
  async () => (await import("./ExcalidrawSceneImpl")).ExcalidrawSceneImpl
);

export function ExcalidrawScene(props: ExcalidrawSceneProps) {
  return <ExcalidrawSceneImpl {...props} />;
}
