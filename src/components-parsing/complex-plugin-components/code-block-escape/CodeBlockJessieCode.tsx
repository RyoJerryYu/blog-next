import { JXGBoard } from "@/components/JXGBoard/JXGBoard";
import { CodeBlockProps } from "@/core/parsing/complex-plugins/code-block-escape/types";

export const CodeBlockJessieCode = (props: CodeBlockProps) => {
  return (
    <JXGBoard
      jessieCode
      logic={props.value}
      boardAttributes={{
        grid: true,
        axis: true,
      }}
    />
  );
};
