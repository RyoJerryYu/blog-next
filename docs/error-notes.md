## MDX 编译失败：`Could not parse expression with acorn`

### 现象（Symptoms）

- 执行 `yarn build`（或缓存初始化脚本 `scripts/init-cache.ts`）时失败。
- 终端输出中出现：
  - `[next-mdx-remote] error compiling MDX`
  - `Could not parse expression with acorn`
  - `More information: https://mdxjs.com/docs/troubleshooting-mdx`
- 失败文件示例：`public/content/learn_from_ai/2026-01-01-变分法入门与拉格朗日力学衔接.md`
- 特点：错误信息没有给出明确的行列号（被包装/格式化后丢失了底层位置信息），导致“看上去像内容随机坏掉”。

### 根因（Root Cause）

这次问题的本质不是某一条 LaTeX 公式写错，而是 **MDX 解析器把正文中的 `{...}` 当成了 MDX 表达式**，并交给 `acorn` 当 JavaScript 解析；当花括号内部包含 **非 JS 合法字符**（例如 `∈`）就会报：

- `Could not parse expression with acorn`
- `Unexpected character '∈'`

触发点示例（正文里出现 `max_{x∈[a,b]}` 这类写法时，`{x∈[a,b]}` 会被误当成 MDX 表达式）：

- `‖δy‖∞ = max_{x∈[a,b]} |δy(x)| 很小。`

更关键的“为什么现在才炸”：项目里使用 `next-mdx-remote/serialize` 编译内容时，**如果传入的是纯字符串**，它会创建一个没有 `.path` 的 `VFile`。在这种情况下，MDX 的解析路径会让 `{...}` 更容易按“MDX 表达式”处理，从而触发上述 acorn 错误。

换句话说：

- **传字符串给 `serialize()`（vfile.path 为空）** → 更容易触发表达式解析 → 文章里出现 `{x∈[a,b]}` 这类内容就会炸。
- **传带 `path` 的 `VFile` 给 `serialize()`** → 解析行为稳定 → 同样内容不炸。

### 如何排查与定位（How to Debug）

#### 1) 先拿到“真实报错位置”

因为 `next-mdx-remote` 会包装错误，默认输出可能没有行列号。可以用 `@mdx-js/mdx` 直接编译以获取底层错误对象（包含 `line/column`、`source` 等字段），并确认是否来自：

- `source: micromark-extension-mdx-expression`
- `ruleId: acorn`

在本次排查中，最终拿到了明确位置：

- `line: 210, column: 71`
- `cause.message: Unexpected character '∈'`

然后回到原文对应行附近检查 `{...}` 内容。

#### 2) 做“对照实验”验证是 path 缺失导致的

同一份内容分别用两种输入方式编译：

- `compile(string)` / `serialize(string)`：没有 `vfile.path`（更可能失败）
- `compile(VFile{path})` / `serialize(VFile{path})`：有 `vfile.path`（通过）

只要出现“无 path 失败，有 path 成功”，就基本可以确定：问题不是文章本身的 Markdown 结构，而是解析模式差异导致 `{...}` 被当成表达式。

#### 3) 不要误判为某个 remark/rehype 插件

本次最终定位到的“触发源”是 **MDX 内建的表达式扩展**（`micromark-extension-mdx-expression`），并非 `remark-gfm`/`remark-math`/`rehype-katex` 等插件自身“写坏了 AST”。

插件真正的影响点在于：项目在某些路径上把内容喂给编译器时，没有携带正确的 `vfile.path`，间接触发了 MDX 的表达式解析。

### 如何解决（Fix）

#### 方案 A：工程侧修复（推荐）

核心原则：**编译时必须给 `VFile` 设置正确的源文件路径**，并且保持项目内 `pagePath`/`filePath` 语义一致。

落地做法：

1. `parseMdx()` 的入参中同时传入：
   - `pagePath`：站点路由路径（保持原语义，不做“文件路径滥用”）
   - `filePath`：内容源文件路径（用于设置 `vfile.path`）
2. 在 `parseMdx()` 内部使用：
   - `new VFile({ value: content, path: props.filePath })`
   - 再传入 `serialize(vfile, { mdxOptions })`
3. 调用 `parseMdx()` 的位置（SSG / meta 收集阶段）同时补齐 `pagePath` 与 `filePath`。

结果：不修改文章内容也能稳定通过构建，且 `pagePath`/`filePath` 语义保持统一。

#### 方案 B：内容侧修复（可选兜底）

如果希望内容对“更严格的 MDX 解析”也安全，可以避免在普通文本中出现形如 `_{...}` 这种带花括号的写法，改为数学环境并用 LaTeX 命令，例如：

- 把 `max_{x∈[a,b]}` 放到 `$...$` 中，并写成 `\max_{x \in [a,b]}`

或用其它不含 `{...}` 的表达方式。

### 结论（Takeaway）

- `Could not parse expression with acorn` 很多时候不是“代码块”问题，而是 **MDX 把 `{...}` 当表达式解析**。
- 如果项目里对 Markdown/MDX 混用，务必保证编译阶段传入 `VFile` 时带上正确的 `path`，否则解析行为可能随输入形态改变，从而出现“同一篇文章在不同阶段/不同脚本里表现不一致”的诡异 bug。

### 附：排查脚本（已删除，仅保留备忘）

当你遇到同类问题，且终端只给出 `Could not parse expression with acorn` 而没有行列号时，可以用下面脚本做三件事：

1. 逐个启用 `remarkPlugins` / `rehypePlugins`，排除“某个插件导致的 AST 产出非法”。
2. 对比 `compile(string)` vs `compile(vfile with path)`，验证是否是 `vfile.path` 缺失导致解析模式变化。
3. 对比 `serialize(string)` vs `serialize(VFile{path})`，复现 `next-mdx-remote` 包装后的行为差异。

运行方式：

- `yarn tsx -C import scripts/debug-mdx-error.ts`

脚本内容（原文件：`scripts/debug-mdx-error.ts`）：

```ts
import { readFile } from "node:fs/promises";
import util from "node:util";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkUnwrapImages from "remark-unwrap-images";
import matter from "gray-matter";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { createHighlighter } from "shiki";
import { langAlias, langs } from "@/grammars";
import { removeImportsExportsPlugin } from "../node_modules/next-mdx-remote/dist/plugins/remove-imports-exports.js";
import { parseMdx } from "@/core/parsing/rendering-parse";
import { serialize } from "next-mdx-remote/serialize";
import { VFile } from "vfile";

import { remarkObsidianCallout } from "@/core/parsing/complex-plugins/obsidian-callout/remark-obsidian-callout";
import remarkObsidianHighlight from "@/core/parsing/complex-plugins/obsidian-highlight/remark-obsidian-highlight";
import remarkObsidianRich from "@/core/parsing/complex-plugins/obsidian-rich/remark-obsidian-rich";
import remarkObsidianWikilink from "@/core/parsing/complex-plugins/obsidian-wikilink/remark-obsidian-wikilink";
import { remarkObsidianTag } from "@/core/parsing/complex-plugins/obsidian-tag/remark-obsidian-tag";
import {
  remarkCodeBlockEscape,
  RemarkCodeBlockEscapeOptions,
} from "@/core/parsing/complex-plugins/code-block-escape/remark-code-block-escape";
import {
  rehypeHeadingAnchorCollection,
  RehypeSectionAnchorCollectionOptions,
} from "@/core/parsing/rehype-plugins/rehype-heading-anchor-collection";

async function main() {
  const mdPath =
    "public/content/learn_from_ai/2026-01-01-变分法入门与拉格朗日力学衔接.md";
  const rawFile = await readFile(mdPath, "utf8");
  const content = rawFile;

  const dumpError = (err: unknown) => {
    console.error("MDX compile FAILED. Full error dump:");
    console.error(util.inspect(err, { depth: null, showHidden: true }));

    const e = err as any;
    try {
      console.error("own props:", Object.getOwnPropertyNames(e));
    } catch {}
    for (const k of [
      "name",
      "message",
      "reason",
      "stack",
      "cause",
      "position",
      "loc",
      "line",
      "column",
      "place",
      "file",
      "source",
    ]) {
      if (e?.[k] !== undefined) {
        console.error(`${k}:`, e[k]);
      }
    }
  };

  const remarkPluginsToTest: Array<{ name: string; plugin: any; options?: any }> =
    [
      { name: "remark-gfm", plugin: remarkGfm },
      { name: "remark-math", plugin: remarkMath },
      { name: "remark-obsidian-callout", plugin: remarkObsidianCallout },
      {
        name: "remark-obsidian-rich",
        plugin: remarkObsidianRich,
        options: {
          matchers: [
            [
              (p: any) =>
                p.file.endsWith(".excalidraw") || p.file.endsWith(".excalidraw.md"),
              "ObsidianRichExcalidraw",
            ],
          ],
          isMetaPhase: true,
          collectRefAliases: () => {},
        },
      },
      {
        name: "remark-obsidian-wikilink",
        plugin: remarkObsidianWikilink,
        options: {
          isMetaPhase: true,
          collectRefAliases: () => {},
        },
      },
      {
        name: "remark-obsidian-tag",
        plugin: remarkObsidianTag,
        options: {
          isMetaPhase: true,
          firstTagParagraph: true,
          collectMdxTags: () => {},
        },
      },
      { name: "remark-obsidian-highlight", plugin: remarkObsidianHighlight },
      {
        name: "remark-code-block-escape",
        plugin: remarkCodeBlockEscape,
        options: {
          escapes: [
            ["mermaid", "CodeBlockMermaid"],
            ["jessiecode", "CodeBlockJessieCode"],
          ],
        } as RemarkCodeBlockEscapeOptions,
      },
      { name: "remark-unwrap-images", plugin: remarkUnwrapImages },
      { name: "next-mdx-remote:remove-imports-exports", plugin: removeImportsExportsPlugin },
    ];

  // Incrementally add plugins to find the first one that triggers the acorn error.
  const active: any[] = [];
  for (const item of remarkPluginsToTest) {
    active.push(item.options ? [item.plugin, item.options] : item.plugin);
    try {
      await compile(
        { value: content, path: mdPath },
        {
          development: true,
          remarkPlugins: active,
        }
      );
      console.log(`OK with ${item.name}`);
    } catch (err) {
      console.error(`FAILED after enabling ${item.name}`);
      dumpError(err);
      return;
    }
  }

  console.log("All tested remark plugins OK");

  const rehypePluginsToTest: Array<{ name: string; plugin: any; options?: any }> =
    [
      { name: "rehype-slug", plugin: rehypeSlug },
      {
        name: "rehype-autolink-headings",
        plugin: rehypeAutolinkHeadings,
        options: { behavior: "prepend" },
      },
      {
        name: "rehype-heading-anchor-collection",
        plugin: rehypeHeadingAnchorCollection,
        options: {
          collectResult: () => {},
        } as RehypeSectionAnchorCollectionOptions,
      },
      {
        name: "rehype-katex",
        plugin: rehypeKatex,
        options: { strict: false },
      },
      {
        name: "rehype-pretty-code",
        plugin: rehypePrettyCode,
        options: {
          theme: "plastic",
          keepBackground: false,
          defaultLang: "plaintext",
          onVisitLine: (node: any) => {
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine: (_node: any) => {},
          onVisitHighlightedWord: (node: any, _id: string | undefined) => {
            node.properties.className = ["word"];
          },
          getHighlighter: (options: any) =>
            createHighlighter({
              ...options,
              langs: [...options.langs, ...langs],
              langAlias: {
                ...options.langAlias,
                ...langAlias,
              },
            }),
        },
      },
    ];

  const activeRehype: any[] = [];
  for (const item of rehypePluginsToTest) {
    activeRehype.push(item.options ? [item.plugin, item.options] : item.plugin);
    try {
      await compile(
        { value: content, path: mdPath },
        {
          development: true,
          remarkPlugins: active,
          rehypePlugins: activeRehype,
        }
      );
      console.log(`OK with ${item.name}`);
    } catch (err) {
      console.error(`FAILED after enabling ${item.name}`);
      dumpError(err);
      return;
    }
  }

  console.log("All tested rehype plugins OK");

  // Finally, mimic next-mdx-remote compile options as closely as possible.
  try {
    await compile(
      { value: content, path: mdPath },
      {
        development: false,
        outputFormat: "function-body",
        providerImportSource: "@mdx-js/react",
        remarkPlugins: active,
        rehypePlugins: activeRehype,
      } as any
    );
    console.log("OK with next-mdx-remote-like compile options (function-body)");
  } catch (err) {
    console.error("FAILED with next-mdx-remote-like compile options (function-body)");
    dumpError(err);
    return;
  }

  // Identify which plugin *requires vfile.path* by forcing next-mdx-remote to
  // compile from a plain string (no VFile.path).
  console.log("\n--- detecting plugin that fails without vfile.path ---");
  const strippedForSerialize = matter(rawFile).content;

  // Prove whether @mdx-js/mdx itself behaves differently when `path` is missing.
  try {
    await compile(strippedForSerialize, {
      development: true,
      outputFormat: "function-body",
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [remarkGfm, remarkMath],
    } as any);
    console.log("compile(string) OK (no path)");
  } catch (err) {
    console.error("compile(string) FAILED (no path)");
    dumpError(err);
  }

  try {
    await compile(
      { value: strippedForSerialize, path: mdPath },
      {
        development: true,
        outputFormat: "function-body",
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm, remarkMath],
      } as any
    );
    console.log("compile(vfile with path) OK");
  } catch (err) {
    console.error("compile(vfile with path) FAILED");
    dumpError(err);
  }

  // Use the same baseline remark plugins as the real pipeline. Without remark-math,
  // `{}` inside `$...$` may be interpreted as MDX expressions.
  const baseRemarkForSerialize: any[] = [
    remarkPluginsToTest[0].plugin, // remark-gfm
    remarkPluginsToTest[1].plugin, // remark-math
  ];

  // 1) Sanity check: baseline should compile even without vfile.path.
  try {
    await serialize(strippedForSerialize, {
      mdxOptions: {
        remarkPlugins: baseRemarkForSerialize,
        rehypePlugins: activeRehype,
      },
    });
    console.log("serialize(string) OK with baseline remark plugins (gfm+math)");
  } catch (err) {
    console.error("serialize(string) FAILED with baseline remark plugins (gfm+math)");
    dumpError(err);
  }

  // 2) Incrementally add the remaining remark plugins while keeping rehype fixed.
  const activeForSerialize: any[] = [...baseRemarkForSerialize];
  for (const item of remarkPluginsToTest.slice(2)) {
    activeForSerialize.push(
      item.options ? [item.plugin, item.options] : item.plugin
    );
    try {
      await serialize(strippedForSerialize, {
        mdxOptions: {
          remarkPlugins: activeForSerialize,
          rehypePlugins: activeRehype,
        },
      });
      console.log(`serialize(string) OK with + ${item.name}`);
    } catch (err) {
      console.error(`serialize(string) FAILED after enabling ${item.name}`);
      dumpError(err);
      break;
    }
  }

  // Compare with the project's actual parseMdx() (next-mdx-remote/serialize wrapper).
  try {
    const stripped = matter(rawFile).content;
    await parseMdx(stripped, { pagePath: mdPath, filePath: mdPath, isMetaPhase: true });
    console.log("OK with project parseMdx() on gray-matter stripped content");
  } catch (err) {
    console.error("FAILED with project parseMdx() on gray-matter stripped content");
    dumpError(err);
  }

  // Try calling next-mdx-remote serialize with a VFile that has `.path`,
  // which some plugins depend on.
  try {
    const stripped = matter(rawFile).content;
    await serialize(new VFile({ value: stripped, path: mdPath }), {
      mdxOptions: {
        remarkPlugins: active,
        rehypePlugins: activeRehype,
      },
    });
    console.log("OK with next-mdx-remote serialize(VFile{path})");
  } catch (err) {
    console.error("FAILED with next-mdx-remote serialize(VFile{path})");
    dumpError(err);
  }
}

main().catch((e) => {
  console.error("debug script failed:", e);
  process.exit(1);
});
```
