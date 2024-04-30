import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { remarkCodeBlockEscape } from "./remark-code-block-escape";

const md = `
# Hello

\`\`\`js name thrid forth
console.log("Hello, World!");
\`\`\`

\`\`\`py
print("Hello, World!")
\`\`\`

\`\`\`
log.Info("Hello, World!")
\`\`\`
`;

const codeBlockComponentName = "CodeBlock";

const jsCodeBlockRegex =
  /<CodeBlock lang="js" meta="name thrid forth" value="console.log\(.*\);" \/>/;

const pyCodeBlockRegex = /<CodeBlock lang="py" value="print\(.*\)" \/>/;
const goCodeBlockRegex = /<CodeBlock value="log.Info.*" \/>/;

describe("code block escape", () => {
  it("should transformed when lang matched", () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkCodeBlockEscape, { escapes: [["js", codeBlockComponentName]] })
      .use(remarkMdx)
      .use(remarkStringify);

    const res = processor.processSync(md);
    expect(res.toString()).toMatch(jsCodeBlockRegex);
    expect(res.toString()).not.toMatch(pyCodeBlockRegex);
    expect(res.toString()).not.toMatch(goCodeBlockRegex);
  });
  it("should not transformed when no matcher passed", () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkCodeBlockEscape)
      .use(remarkMdx)
      .use(remarkStringify);
    const res = processor.processSync(md);
    expect(res.toString()).not.toMatch(jsCodeBlockRegex);
    expect(res.toString()).not.toMatch(pyCodeBlockRegex);
    expect(res.toString()).not.toMatch(goCodeBlockRegex);
  });
  it("should not transformed when lang not matched", () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkCodeBlockEscape, { escapes: [["py", codeBlockComponentName]] })
      .use(remarkMdx)
      .use(remarkStringify);
    const res = processor.processSync(md);
    expect(res.toString()).not.toMatch(jsCodeBlockRegex);
    expect(res.toString()).toMatch(pyCodeBlockRegex);
    expect(res.toString()).not.toMatch(goCodeBlockRegex);
  });
  it("should well done with multiple escapes", () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkCodeBlockEscape, {
        escapes: [
          ["js", codeBlockComponentName],
          ["py", codeBlockComponentName],
        ],
      })
      .use(remarkMdx)
      .use(remarkStringify);
    const res = processor.processSync(md);
    expect(res.toString()).toMatch(jsCodeBlockRegex);
    expect(res.toString()).toMatch(pyCodeBlockRegex);
    expect(res.toString()).not.toMatch(goCodeBlockRegex);
  });
  it("should well done with regex matcher", () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkCodeBlockEscape, {
        escapes: [[/(js|py)/, codeBlockComponentName]],
      })
      .use(remarkMdx)
      .use(remarkStringify);
    const res = processor.processSync(md);
    expect(res.toString()).toMatch(jsCodeBlockRegex);
    expect(res.toString()).toMatch(pyCodeBlockRegex);
    expect(res.toString()).not.toMatch(goCodeBlockRegex);
  });
  it("should well done with function matcher", () => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkCodeBlockEscape, {
        escapes: [
          [(lang) => lang === "js" || lang === "py", codeBlockComponentName],
        ],
      })
      .use(remarkMdx)
      .use(remarkStringify);
    const res = processor.processSync(md);
    expect(res.toString()).toMatch(jsCodeBlockRegex);
    expect(res.toString()).toMatch(pyCodeBlockRegex);
    expect(res.toString()).not.toMatch(goCodeBlockRegex);
  });
});
