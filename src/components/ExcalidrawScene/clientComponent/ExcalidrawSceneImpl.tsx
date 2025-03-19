"use client";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/dist/types/excalidraw/types";
import { Refresh } from "@mui/icons-material";
import { useRef } from "react";
import { ExcalidrawSceneProps } from "../types/ExcalidrawSceneProps";

export function ExcalidrawSceneImpl({ elements }: ExcalidrawSceneProps) {
  const excalidrawAPIRef = useRef<ExcalidrawImperativeAPI | null>(null);
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
        >
          <MainMenu>
            <MainMenu.Item
              icon={<Refresh />}
              onSelect={() => {
                excalidrawAPIRef.current?.scrollToContent(undefined, {
                  fitToContent: true,
                });
              }}
            >
              Reset
            </MainMenu.Item>
          </MainMenu>
        </Excalidraw>
      </div>
    </>
  );
}
