import { ComplexPlugin, RederingOptions } from "@/core/types/rendering";
import { FC, createElement } from "react";
import { Plugin } from "unified";
import { genMdxComponents, genMdxOptions } from "./plugins";

const emptyPlugin: Plugin = () => {};
const EmptyComponent: FC = () => {
  return createElement("div");
};
const emptyComplexPlugin: ComplexPlugin = {
  remarkPlugin: () => {
    return emptyPlugin;
  },
  rehypePlugin: () => {
    return emptyPlugin;
  },
  mdxComponent: () => {
    return ["EmptyComponent", EmptyComponent];
  },
};

const newDefaultOption = (): RederingOptions => {
  return {
    mdxOptions: {
      remarkPlugins: [emptyPlugin],
      rehypePlugins: [emptyPlugin],
    },
    mdxComponents: {
      EmptyComponent,
    },
    complexPlugins: [emptyComplexPlugin],
  };
};

describe("genMdxOpitons", () => {
  const defaultOption = newDefaultOption();
  const mdxOptions = genMdxOptions(defaultOption);
  it("should return the correct mdxOptions", () => {
    expect(mdxOptions.remarkPlugins?.length).toBe(2);
  });
  const newMdxOptions = genMdxOptions(defaultOption);
  it("defaultOption should be statics", () => {
    expect(newMdxOptions.rehypePlugins?.length).toBe(2);
  });
});

describe("genMdxComponents", () => {
  const defaultOption = newDefaultOption();
  const mdxComponents = genMdxComponents(defaultOption);
  it("should return the correct mdxComponents", () => {
    expect(mdxComponents.EmptyComponent).toBeDefined();
  });
  const newMdxComponents = genMdxComponents(defaultOption);
  it("defaultOption should be statics", () => {
    expect(newMdxComponents.EmptyComponent).toBeDefined();
  });
});
