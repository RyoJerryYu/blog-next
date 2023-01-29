import unified from "unified";
import { Code, Root, Paragraph } from "mdast";
import { Parent } from "unist";
import { visit } from "unist-util-visit";
import mermaid from "mermaid";
import playwright from "playwright";
import { VFileCompatible } from "@mdx-js/mdx/lib/compile";
import rehypeParse from "rehype-parse";
import { optimize } from "svgo";

type RemarkMermaidOptions = {
  launchOptions?: playwright.LaunchOptions;
  contextOptions?: playwright.BrowserContextOptions;
  theme?: string;
  wrap?: boolean;
  classNames?: string[];
};

const DEFAULT_OPTIONS: RemarkMermaidOptions = {
  contextOptions: {
    viewport: { width: 1920, height: 1080 },
  },
  theme: "default",
  wrap: false,
  classNames: [],
};

type CodeInstance = {
  node: Code;
  index: number;
  parent: Parent;
};

type RenderResult = string;

const parseSvg = (svg: string) => {
  const svgOptimized = optimize(svg, {
    js2svg: {
      indent: 2,
      pretty: true,
    },
    multipass: false,
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupEnableBackground: false,
            convertShapeToPath: false,
            inlineStyles: {
              onlyMatchedOnce: false,
            },
            moveElemsAttrsToGroup: false,
            moveGroupAttrsToElems: false,
            removeEmptyAttrs: false,
            removeUselessStrokeAndFill: {
              removeNone: true,
            },
          },
        },
      },
      "convertStyleToAttrs",
      "removeOffCanvasPaths",
      "removeRasterImages",
      "removeScriptElement",
      "removeStyleElement",
      "removeXMLNS",
      "reusePaths",
      {
        name: "removeAttrs",
        params: {
          attrs: ["class"],
        },
      },
    ],
  }).data;
  const processor = unified.unified().use(rehypeParse);
  return processor.parse(svgOptimized);
};

const searchMermaidBlocks = (ast: Root) => {
  const instances: CodeInstance[] = [];

  visit(ast, { type: "code", lang: "mermaid" }, (node, index, parent) => {
    instances.push({ node, index, parent });
  });

  return instances;
};

const replaceMermaidBlocks = (
  instances: CodeInstance[],
  results: RenderResult[],
  options?: RemarkMermaidOptions
) => {
  for (let i = 0; i < instances.length; i++) {
    const { node, index, parent } = instances[i];
    const result = results[i];
    const svgAst = parseSvg(result);
    if (options?.wrap) {
      parent.children[index] = {
        type: "parent",
        children: [],
        data: {
          hChildren: [
            {
              type: "element",
              children: [svgAst],
              tagName: "div",
              properties: {
                className: options?.classNames,
              },
            },
          ],
        },
      } as Parent;
    } else {
      parent.children[index] = {
        type: "paragraph",
        children: [],
        data: {
          hChildren: [svgAst],
        },
      } as Paragraph;
    }
  }
};

const remarkMermaid: unified.Plugin<[RemarkMermaidOptions?], Root> = (
  options
) => {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const { launchOptions, contextOptions, theme, wrap, classNames } = opts;

  return async (tree, _file) => {
    const mermaidBlocks = searchMermaidBlocks(tree);
    if (mermaidBlocks.length === 0) {
      return;
    }

    const browser = await playwright.chromium.launch(launchOptions);
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    await page.setContent(`<!DOCTYPE html>`);
    await page.addScriptTag({
      url: "https://unpkg.com/mermaid/dist/mermaid.min.js",
      type: "module",
    });

    const svgResult = await page.evaluate(
      ({ blocks, theme }) => {
        mermaid.mermaidAPI.initialize({ theme, startOnLoad: false });
        return blocks.map(({ node }, id) =>
          mermaid.mermaidAPI.render(`mermaid-${id}`, node.value)
        );
      },
      {
        blocks: mermaidBlocks,
        theme,
      }
    );
    await browser.close();

    replaceMermaidBlocks(mermaidBlocks, svgResult, opts);
  };
};

export default remarkMermaid;
