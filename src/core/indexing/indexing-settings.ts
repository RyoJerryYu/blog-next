import { BaseMeta, PostMeta } from "../types/indexing";
import { AliasIndexBuilder } from "./index-building/alias-index-builder/alias-index-builder";
import { ClipDataIndexBuilder } from "./index-building/clip-data-index-builder/clip-data-index-builder";
import { PrevNextIndexBuilder } from "./index-building/prev-next-index-builder/prev-next-index-builder";
import { TagIndexBuilder } from "./index-building/tag-index-builder/tag-index-builder";
import {
  MockGitMetaCollector,
  defaultGitMetaCollector,
} from "./meta-collecting/git-meta-collector";
import { MetaCollectorChain } from "./meta-collecting/meta-collecting";
import { PostRawMetaCollector } from "./meta-collecting/post-raw-meta-collector";
import { PostPathMapper } from "./path-mapping/post-path-mapper";
import { defaultStaticResourcePathMapper } from "./path-mapping/static-resource-path-mapper";
import { WikiPathMapper } from "./path-mapping/wiki-path-mapper";

export function articlePostPathMapper() {
  return new PostPathMapper({
    fileGlobPattern: "public/content/articles/*.md*",
    slugFromFilename: (filename) => filename.match(/(\d*-)*(.*)/)?.[2],
    pathPrefix: "/articles/",
  });
}

export function ideaPostPathMapper() {
  return new PostPathMapper({
    fileGlobPattern: "public/content/ideas/*.md*",
    slugFromFilename: (filename) => filename.match(/(\d*-)*(.*)/)?.[2],
    pathPrefix: "/ideas/",
  });
}

export function learnFromAiPostPathMapper() {
  return new PostPathMapper({
    fileGlobPattern: "public/content/learn_from_ai/*.md*",
    slugFromFilename: (filename) => filename.match(/(\d*-)*(.*)/)?.[2],
    pathPrefix: "/learn_from_ai/",
  });
}

export function testwikiPathMapper() {
  return new WikiPathMapper({
    fileGlobPattern: "public/content/testwiki/**/*.md*",
    pathPrefix: "/testwiki",
  });
}

export const defaultStaticResourceChain: MetaCollectorChain<BaseMeta> = {
  collectors: [],
  defaultMeta: {},
};

export const defaultChain: MetaCollectorChain<PostMeta> = {
  collectors: [
    // new CacheMetaCollector(".", "cache", ["content"]),
    new PostRawMetaCollector(),
    defaultGitMetaCollector(),
  ],
  defaultMeta: {
    content: "",
    title: "<No Title>",
    abstract: "",
    length: 0,
    created_at: null,
    updated_at: null,
    tags: [],
    license: false,
  },
};

export const devReloadingChain: MetaCollectorChain<PostMeta> = {
  collectors: [new PostRawMetaCollector(), new MockGitMetaCollector()],
  defaultMeta: {
    content: "",
    title: "<No Title>",
    abstract: "",
    length: 0,
    created_at: null,
    updated_at: null,
    tags: [],
    license: false,
  },
};

export const pipeline = () => ({
  resourceChains: [
    {
      resourceType: "staticResources",
      pathMapper: defaultStaticResourcePathMapper(),
      collectorChain: defaultStaticResourceChain,
    },
    {
      resourceType: "articles",
      pathMapper: articlePostPathMapper(),
      collectorChain: defaultChain,
    },
    {
      resourceType: "ideas",
      pathMapper: ideaPostPathMapper(),
      collectorChain: defaultChain,
    },
    {
      resourceType: "learn_from_ai",
      pathMapper: learnFromAiPostPathMapper(),
      collectorChain: defaultChain,
    },
    {
      resourceType: "testwiki",
      pathMapper: testwikiPathMapper(),
      collectorChain: defaultChain,
    },
  ],
  indexBuilders: [
    {
      handleResources: ["articles", "ideas", "learn_from_ai", "testwiki"],
      builder: new TagIndexBuilder(),
    },
    {
      handleResources: [
        "articles",
        "ideas",
        "learn_from_ai",
        "staticResources",
        "testwiki",
      ],
      builder: new AliasIndexBuilder(),
    },
    {
      handleResources: ["articles", "ideas", "learn_from_ai"],
      builder: new PrevNextIndexBuilder(),
    },
    {
      handleResources: [],
      builder: new ClipDataIndexBuilder(),
    },
  ],
});
