import { BaseMeta, MDXMeta, PostMeta } from "../types/indexing";
import { AliasIndexBuilder } from "./index-building/alias-index-builder/alias-index-builder";
import { BackrefIndexBuilder } from "./index-building/backref-index-builder/backref-index-builder";
import { ClipDataIndexBuilder } from "./index-building/clip-data-index-builder/clip-data-index-builder";
import { PrevNextIndexBuilder } from "./index-building/prev-next-index-builder/prev-next-index-builder";
import { TagIndexBuilder } from "./index-building/tag-index-builder/tag-index-builder";
import { WikiTreeIndexBuilder } from "./index-building/wiki-tree-index-builder/wiki-tree-index-builder";
import {
  MockGitMetaCollector,
  defaultGitMetaCollector,
} from "./meta-collecting/git-meta-collector";
import { MDXMetaCollector } from "./meta-collecting/mdx-meta-collector";
import { MetaCollectorChain } from "./meta-collecting/meta-collecting";
import { PathMetaCollector } from "./meta-collecting/path-meta-collector";
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

export function ygowikiPathMapper() {
  return new WikiPathMapper({
    fileGlobPattern: "public/content/ygowiki/**/*.md*",
    pathPrefix: "/ygowiki",
  });
}

export function testwikiPathMapper() {
  return new WikiPathMapper({
    fileGlobPattern: "public/content/testwiki/**/*.md*",
    pathPrefix: "/testwiki",
  });
}

export function jessiecodeWikiPathMapper() {
  return new WikiPathMapper({
    fileGlobPattern: "public/content/jessiecode-wiki/**/*.md*",
    pathPrefix: "/jessiecode-wiki",
  });
}

export const defaultStaticResourceChain: MetaCollectorChain<BaseMeta> = {
  collectors: [],
  defaultMeta: {},
};

export const defaultChain: MetaCollectorChain<PostMeta & MDXMeta> = {
  collectors: [
    // new CacheMetaCollector(".", "cache", ["content"]),
    new PostRawMetaCollector(),
    new PathMetaCollector(),
    new MDXMetaCollector(),
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
    headingTrees: [],
    wikiRefAliases: [],
    richRefAliases: [],
  },
};

export const devReloadingChain: MetaCollectorChain<PostMeta & MDXMeta> = {
  collectors: [
    new PostRawMetaCollector(),
    new PathMetaCollector(),
    new MockGitMetaCollector(),
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
    headingTrees: [],
    wikiRefAliases: [],
    richRefAliases: [],
  },
};

export function pipeline() {
  return {
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
        resourceType: "jessiecode-wiki",
        pathMapper: jessiecodeWikiPathMapper(),
        collectorChain: defaultChain,
      },
      {
        resourceType: "testwiki",
        pathMapper: testwikiPathMapper(),
        collectorChain: defaultChain,
      },
      {
        resourceType: "ygowiki",
        pathMapper: ygowikiPathMapper(),
        collectorChain: defaultChain,
      },
    ],
    indexBuilders: [
      {
        handleResources: [
          "articles",
          "ideas",
          "learn_from_ai",
          "jessiecode-wiki",
          "ygowiki",
          "testwiki",
        ],
        builder: new TagIndexBuilder(),
      },
      {
        handleResources: [
          "articles",
          "ideas",
          "learn_from_ai",
          "jessiecode-wiki",
          "ygowiki",
          "testwiki",
          "staticResources",
        ],
        builder: new AliasIndexBuilder(),
      },
      {
        handleResources: [
          "articles",
          "ideas",
          "learn_from_ai",
          "jessiecode-wiki",
          "ygowiki",
          "testwiki",
        ],
        builder: new BackrefIndexBuilder(),
      },
      {
        handleResources: ["articles", "ideas", "learn_from_ai"],
        builder: new PrevNextIndexBuilder(),
      },
      {
        handleResources: [],
        builder: new ClipDataIndexBuilder(),
      },
      {
        handleResources: ["testwiki", "ygowiki", "jessiecode-wiki"],
        builder: new WikiTreeIndexBuilder(true),
      },
    ],
  };
}
