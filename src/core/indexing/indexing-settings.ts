import { AliasIndexBuilder } from "./index-building/alias-index-builder";
import { ClipDataIndexBuilder } from "./index-building/clip-data-index-builder";
import { PrevNextIndexBuilder } from "./index-building/prev-next-index-builder";
import { TagIndexBuilder } from "./index-building/tag-index-builder";
import {
  MockGitMetaCollector,
  defaultGitMetaCollector,
} from "./meta-collecting/git-meta-collector";
import {
  MetaCollectorChain,
  PostMeta,
  ResourceMeta,
} from "./meta-collecting/meta-collecting";
import { PostRawMetaCollector } from "./meta-collecting/post-raw-meta-collector";
import { PostPathMapper } from "./path-mapping/post-path-mapper";
import { defaultStaticResourcePathMapper } from "./path-mapping/static-resource-path-mapper";

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

export const defaultStaticResourceChain: MetaCollectorChain<ResourceMeta> = {
  collectors: [],
  defaultMeta: {},
};

export const defaultChain: MetaCollectorChain<PostMeta> = {
  collectors: [new PostRawMetaCollector(), defaultGitMetaCollector()],
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

export const pipeline = {
  chains: {
    staticResources: {
      pathMapper: defaultStaticResourcePathMapper(),
      collectorChain: defaultStaticResourceChain,
    },
    articles: {
      pathMapper: articlePostPathMapper(),
      collectorChain: defaultChain,
    },
    ideas: {
      pathMapper: ideaPostPathMapper(),
      collectorChain: defaultChain,
    },
  },
  indexBuilders: [
    {
      resources: ["articles", "ideas"],
      builder: new TagIndexBuilder(),
    },
    {
      resources: ["articles", "ideas", "staticResources"],
      builder: new AliasIndexBuilder(),
    },
    {
      resources: ["articles", "ideas"],
      builder: new PrevNextIndexBuilder(),
    },
    {
      resources: [],
      builder: new ClipDataIndexBuilder(),
    },
  ],
};