import { JXGBoard } from "@/components/JXGBoard/JXGBoard";
import { CodeBlockProps } from "@/core/parsing/complex-plugins/code-block-escape/types";
import matter from "gray-matter";
import { CodeBlockLayout } from "./CodeBlockLayout";

/**
 * source 如下：
 *
 * ---
 * boundingbox: [-10, 10, 10, -10]
 * grid: true
 * axis: true
 * ---
 *
 * A = point(0, 0)
 *
 */

export const CodeBlockJessieCode = (props: CodeBlockProps) => {
  const frontMatter = matter(props.value);
  const codeContent = frontMatter.content;

  let boardAttributes: Partial<JXG.BoardAttributes> = {};
  if (frontMatter.data) {
    boardAttributes = frontMatter.data as Partial<JXG.BoardAttributes>;
  }

  return (
    <CodeBlockLayout {...props}>
      <JXGBoard
        jessieCode
        logic={codeContent}
        boardAttributes={{
          grid: true,
          axis: true,
          ...boardAttributes,
        }}
      />
    </CodeBlockLayout>
  );
};
