"use client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";

type ExcalidrawSceneProps = {
  elements: ExcalidrawElement[];
};

export function ExcalidrawScene({ elements }: ExcalidrawSceneProps) {
  return (
    <>
      <div className="h-96">
        <Excalidraw
          initialData={{
            elements,
            scrollToContent: true,
          }}
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: false,
              clearCanvas: false,
              export: false,
              loadScene: false,
              saveToActiveFile: false,
              toggleTheme: false,
              saveAsImage: false,
            },
          }}
          viewModeEnabled
          zenModeEnabled={false}
          gridModeEnabled={false}
        ></Excalidraw>
      </div>
    </>
  );
}
