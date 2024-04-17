import {
  MockGitMetaCollector,
  defaultGitMetaCollector,
} from "./meta-collecting/git-meta-collector";
import { CollectorChain, PostMeta } from "./meta-collecting/meta-collecting";
import { PostRawMetaCollector } from "./meta-collecting/post-raw-meta-collector";

export const defaultChain: CollectorChain<PostMeta> = {
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

export const devReloadingChain: CollectorChain<PostMeta> = {
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
