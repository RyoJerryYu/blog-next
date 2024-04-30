import { dynamicLoading } from "@/components/Loading/dynamic-loading";
import { ExcalidrawSceneProps } from "./clientComponent/ExcalidrawSceneImpl";

const ExcalidrawSceneImpl = dynamicLoading(
  async () =>
    (await import("./clientComponent/ExcalidrawSceneImpl")).ExcalidrawSceneImpl
);

export function ExcalidrawScene(props: ExcalidrawSceneProps) {
  return <ExcalidrawSceneImpl {...props} />;
}
