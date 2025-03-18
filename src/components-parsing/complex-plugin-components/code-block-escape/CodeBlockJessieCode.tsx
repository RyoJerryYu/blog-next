import { JXGBoard } from "@/components/JXGBoard/JXGBoard";
import { CodeBlockProps } from "@/core/parsing/complex-plugins/code-block-escape/types";
import matter from "gray-matter";

/**
 * source 如下：
 *
 * boundingbox: [-10, 10, 10, -10]
 * grid: true
 * axis: true
 *
 * ---
 *
 * A = point(0, 0)
 *
 * 找到 --- 之前的内容，并将其作为 graphInfo, 之后的代码作为 codeContent
 * 分割线可能有 3 个以上的 ·-· ，之前与之后都可能有零个或多个空行
 * 分割线也可能不存在，此时整个 source 作为 codeContent , graphInfo 为默认值
 */
const regex = /^(.*?)(?:\n*---+\n*)([\s\S]*)$/m;

export const CodeBlockJessieCode = (props: CodeBlockProps) => {
  const frontMatter = matter(props.value);
  const codeContent = frontMatter.content;

  console.log("frontmatter", frontMatter);
  let boardAttributes: Partial<JXG.BoardAttributes> = {};
  if (frontMatter.data) {
    boardAttributes = frontMatter.data as Partial<JXG.BoardAttributes>;
  }

  return (
    <JXGBoard
      jessieCode
      logic={codeContent}
      boardAttributes={{
        grid: true,
        axis: true,
        ...boardAttributes,
      }}
    />
  );
};
