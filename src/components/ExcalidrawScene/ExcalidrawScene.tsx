import { dynamicLoading } from "@/components/Loading/dynamic-loading";
import { ExcalidrawSceneProps } from "./types/ExcalidrawSceneProps";

const ExcalidrawSceneImpl = dynamicLoading(
  async () =>
    (await import("./clientComponent/ExcalidrawSceneImpl")).ExcalidrawSceneImpl
);

export function ExcalidrawScene(props: ExcalidrawSceneProps) {
  return <ExcalidrawSceneImpl {...props} />;
}
