"use client";
import clsx from "clsx";
import JXG from "jsxgraph";
import { useEffect, useRef, useState } from "react";
import { JXGBoardProps } from "../types/JXGBoardProps";

export const JXGBoardImpl = (props: JXGBoardProps) => {
  const id = useRef(Math.random().toString(36).substring(2, 15));
  const [board, setBoard] = useState<JXG.Board | null>(null);

  useEffect(() => {
    const board = JXG.JSXGraph.initBoard(id.current, {
      boundingbox: [-10, 10, 10, -10],
      grid: true,
      ...props.boardAttributes,
    });
    setBoard(board);
  }, []);

  useEffect(() => {
    if (board) {
      if (props.jessieCode) {
        board.jc.parse(props.logic);
      } else {
        props.logic(board);
      }
    }
  }, [board, props.jessieCode, props.logic]);

  return (
    <div id={id.current} className={clsx("w-full h-full", props.className)} />
  );
};
