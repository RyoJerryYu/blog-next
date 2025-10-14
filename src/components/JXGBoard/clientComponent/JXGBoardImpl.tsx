"use client";
import { useGlobalScript } from "@/hooks/use-global-Script";
import { Box } from "@mui/material";
import JXG from "jsxgraph";
import { useEffect, useRef, useState } from "react";
import { JXGBoardProps } from "../types/JXGBoardProps";

export const JXGBoardImpl = (props: JXGBoardProps) => {
  const { boardAttributes, logic, jessieCode, className } = props;
  const id = useRef(Math.random().toString(36).substring(2, 15));
  const [board, setBoard] = useState<JXG.Board | null>(null);
  const mathJaxScript = useRef(null);

  const attr = boardAttributes || {};

  if (!attr.boundingBox && !attr.boundingBox) {
    attr.boundingBox = [-10, 10, 10, -10];
  }

  const mathJaxStatus = useGlobalScript({
    url: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js",
    id: "MathJax-script",
    attributes: {
      id: "MathJax-script",
    },
  });

  useEffect(() => {
    if (mathJaxStatus !== "ready") {
      return;
    }
    const initFunc = async () => {
      JXG.Options.text.useMathJax = true;
      JXG.Options.label.useMathJax = true;
      // @ts-ignore
      if (typeof window.MathJax !== "undefined") {
        console.log("MathJax is defined!!!!!!!!!!!!!!!!");
        //@ts-ignore
        window.MathJax.config.tex.inlineMath = [["$", "$"]];
        //@ts-ignore
        window.MathJax.config.tex.processEscapes = true;
        //@ts-ignore
        window.MathJax.config.chtml.adaptiveCSS = false;
        //@ts-ignore
        await window.MathJax.startup.getComponents();
      }
      const board = JXG.JSXGraph.initBoard(id.current, {
        ...attr,
      });
      setBoard(board);
      if (board) {
        if (jessieCode) {
          board.jc.parse(logic);
        } else {
          logic(board);
        }
      }
    };
    initFunc();
  }, [attr, id, jessieCode, logic, mathJaxStatus]);

  return (
    <>
      <Box id={id.current} sx={{ width: "100%", height: "100%" }} />
      <div ref={mathJaxScript} />
    </>
  );
};
