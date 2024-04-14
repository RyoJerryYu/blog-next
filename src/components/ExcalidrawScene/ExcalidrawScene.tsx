import dynamic from "next/dynamic";

export const ExcalidrawScene = dynamic(
  async () => (await import("./ExcalidrawSceneImpl")).ExcalidrawSceneImpl,
  {
    ssr: false,
  }
);
