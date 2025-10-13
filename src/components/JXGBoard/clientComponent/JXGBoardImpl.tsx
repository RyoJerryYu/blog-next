"use client";
import clsx from "clsx";
import JXG from "jsxgraph";
import { useEffect, useRef, useState } from "react";
import { JXGBoardProps } from "../types/JXGBoardProps";

export const JXGBoardImpl = (props: JXGBoardProps) => {
  const { boardAttributes, logic, jessieCode, className } = props;
  const id = useRef(Math.random().toString(36).substring(2, 15));
  const [board, setBoard] = useState<JXG.Board | null>(null);

  const attr = boardAttributes || {};

  if (!attr.boundingBox && !attr.boundingBox) {
    attr.boundingBox = [-10, 10, 10, -10];
  }

  useEffect(() => {
    const board = JXG.JSXGraph.initBoard(id.current, {
      ...attr,
    });
    setBoard(board);
  }, [attr, id]);

  useEffect(() => {
    if (board) {
      if (jessieCode) {
        board.jc.parse(logic);
      } else {
        logic(board);
      }
    }
  }, [board, jessieCode, logic]);

  return <div id={id.current} className={clsx("w-full h-full", className)} />;
};
