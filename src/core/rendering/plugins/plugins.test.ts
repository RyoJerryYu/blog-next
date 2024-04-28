import {
  BackendPlugins,
  ComplexPlugin,
  FrontendPlugins,
  ParseMdxProps,
} from "@/core/types/rendering";
import { FC, createElement } from "react";
import { Plugin } from "unified";
import { genMdxOptions } from "./backend-plugins";
import { genMdxComponents } from "./frontend-plugins";

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

const newFrontendPlugins = (): FrontendPlugins => {
  return {
    mdxComponents: {
      EmptyComponent,
    },
    complexPlugins: [emptyComplexPlugin],
  };
};
const newBackendPlugins = (): BackendPlugins => {
  return {
    mdxOptions: {
      remarkPlugins: [emptyPlugin],
      rehypePlugins: [emptyPlugin],
    },
    complexPlugins: [emptyComplexPlugin],
  };
};

describe("genMdxOpitons", () => {
  const defaultOption = newBackendPlugins();
  const props: ParseMdxProps = {
    pagePath: "",
  };
  const mdxOptions = genMdxOptions(props, defaultOption);
  it("should return the correct mdxOptions", () => {
    expect(mdxOptions.remarkPlugins?.length).toBe(2);
  });
  const newMdxOptions = genMdxOptions(props, defaultOption);
  it("defaultOption should be statics", () => {
    expect(newMdxOptions.rehypePlugins?.length).toBe(2);
  });
});

describe("genMdxComponents", () => {
  const defaultOption = newFrontendPlugins();
  const mdxComponents = genMdxComponents(defaultOption);
  it("should return the correct mdxComponents", () => {
    expect(mdxComponents.EmptyComponent).toBeDefined();
  });
  const newMdxComponents = genMdxComponents(defaultOption);
  it("defaultOption should be statics", () => {
    expect(newMdxComponents.EmptyComponent).toBeDefined();
  });
});
