import JXG from "jsxgraph";

export type JXGBoardProps = {
  className?: string;
  boardAttributes?: Partial<JXG.BoardAttributes>;
} & (
  | {
      jessieCode?: false;
      logic: (board: JXG.Board) => void;
    }
  | {
      jessieCode: true;
      logic: string;
    }
);
