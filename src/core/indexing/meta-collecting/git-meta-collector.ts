import dayjs from "dayjs";
import fs from "fs";
import git from "isomorphic-git";
import { timeStrFromCommit } from "../utils/git-utils";
import { MetaCollector } from "./meta-collecting";

export type GitMeta = {
  created_at: string;
  updated_at?: string;
};

export class GitMetaCollector implements MetaCollector<GitMeta> {
  constructor(readonly gitDir: string) {}

  handleAbleKeys = (): (keyof GitMeta)[] | "*" => {
    return ["created_at", "updated_at"];
  };

  collectMeta = async (filePath: string): Promise<Partial<GitMeta>> => {
    let commits;
    try {
      commits = await git.log({ fs, dir: this.gitDir, filepath: filePath });
    } catch (e) {
      return {};
    }

    if (commits.length === 0) {
      return {};
    }

    const res: GitMeta = {
      created_at: timeStrFromCommit(commits[commits.length - 1]),
    };
    if (commits.length > 1) {
      res.updated_at = timeStrFromCommit(commits[0]);
    }
    return res;
  };
}

export function defaultGitMetaCollector() {
  return new GitMetaCollector(".");
}

// used for dev mode
// loading git meta is slow, so we mock it
// created_at always be tomorrow, updated_at always be null
export class MockGitMetaCollector implements MetaCollector<GitMeta> {
  handleAbleKeys = (): (keyof GitMeta)[] | "*" => {
    return ["created_at", "updated_at"];
  };

  collectMeta = async (filePath: string): Promise<Partial<GitMeta>> => {
    return {
      created_at: dayjs().add(1, "day").toJSON(),
    };
  };
}
