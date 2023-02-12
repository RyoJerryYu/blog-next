import dayjs from "dayjs";
import fs from "fs";
import git, { ReadCommitResult } from "isomorphic-git";
import { PostMeta, StaticsLoader } from "./loader";
const gitDir = ".";

type GitMeta = {
  created_at?: string;
  updated_at?: string;
};

const parseGitMetaFromFile = async (file: string) => {
  let commits;
  try {
    commits = await git.log({ fs, dir: gitDir, filepath: file });
  } catch (e) {
    return {};
  }

  if (commits.length === 0) {
    return {};
  }

  const timeStrFromCommit = (commit: ReadCommitResult) => {
    return dayjs(commit.commit.committer.timestamp * 1000).toJSON();
  };

  const res: GitMeta = {
    created_at: timeStrFromCommit(commits[0]),
  };
  if (commits.length > 1) {
    res.updated_at = timeStrFromCommit(commits[commits.length - 1]);
  }
  return res;
};

export const shouldMergeGitMeta = (meta: PostMeta) => {
  return !meta.created_at || !meta.updated_at;
};

export const mergeGitMeta = async (file: string, meta: PostMeta) => {
  if (!shouldMergeGitMeta(meta)) {
    return meta;
  }
  const gitMeta = await parseGitMetaFromFile(file);
  return {
    ...meta,
    created_at: meta.created_at || gitMeta.created_at || null,
    updated_at: meta.updated_at || gitMeta.updated_at || null,
  };
};
