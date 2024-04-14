"use client";
import { Excalidraw } from "@excalidraw/excalidraw";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useRef } from "react";

type ExcalidrawSceneProps = {
  elements: ExcalidrawElement[];
};

export function ExcalidrawSceneImpl({ elements }: ExcalidrawSceneProps) {
  const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI>();
  return (
    <>
      <div className="w-full h-full">
        <Excalidraw
          initialData={{
            elements,
            scrollToContent: true,
          }}
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: false,
              export: false,
              loadScene: false,
              saveToActiveFile: false,
              toggleTheme: false,
              saveAsImage: false,
            },
          }}
          theme="light"
          viewModeEnabled={true}
          zenModeEnabled={true}
          gridModeEnabled={false}
          detectScroll={false}
          excalidrawAPI={(api) => {
            excalidrawAPIRef.current = api;

            setTimeout(() => {
              api.scrollToContent(undefined, { fitToContent: true });
            }, 1000);
          }}
        ></Excalidraw>
      </div>
    </>
  );
}
