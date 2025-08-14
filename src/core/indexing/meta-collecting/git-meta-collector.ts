import { BasePathMapping } from "@/core/types/indexing";
import dayjs from "dayjs";
import fs from "fs";
import git from "isomorphic-git";
import { timeStrFromCommit } from "../utils/git-utils";
import { MetaCollector } from "./meta-collecting";

export type GitMeta = {
  created_at: string;
  updated_at?: string;
};

/**
 * A collector that extracts git commit history metadata for a file.
 * Gets the created_at date from the first commit and updated_at from the latest commit.
 */
export class GitMetaCollector implements MetaCollector<GitMeta> {
  /**
   * @param gitDir Directory containing git repository, relative to project root
   */
  constructor(readonly gitDir: string) {}

  /**
   * Returns the meta data fields this collector can handle.
   * This collector handles created_at and updated_at fields from git history.
   * A collector will be skipped if all its handleable fields are already collected.
   */
  handleAbleKeys = (): (keyof GitMeta)[] | "*" => {
    return ["created_at", "updated_at"];
  };

  /**
   * Collects meta data for a resource from its file's git history.
   * Gets created_at from first commit and updated_at from latest commit.
   *
   * @param pathMapping Path mapping for the resource
   * @returns Promise resolving to:
   *   - created_at: ISO date string of first commit
   *   - updated_at: ISO date string of latest commit (if more than one commit)
   */
  collectMeta = async (
    pathMapping: BasePathMapping,
    prevMeta: Partial<GitMeta>
  ): Promise<Partial<GitMeta>> => {
    const filePath = pathMapping.filePath;
    if (prevMeta.created_at && prevMeta.updated_at) {
      return {};
    }

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

/**
 * A mock collector that returns fake git meta data for development mode.
 * Used to avoid slow git operations during development.
 * Always returns created_at as tomorrow's date and no updated_at.
 *
 * Meta data is information that belongs to a specific resource, never depending on other resources.
 * This mock collector implements the MetaCollector interface to provide test data.
 */
export class MockGitMetaCollector implements MetaCollector<GitMeta> {
  handleAbleKeys = (): (keyof GitMeta)[] | "*" => {
    return ["created_at", "updated_at"];
  };

  /**
   * Returns mock git meta data for development.
   * @param pathMapping Path mapping for the resource (unused in mock)
   * @returns Promise resolving to:
   *   - created_at: Tomorrow's date as ISO string
   *   - updated_at: Not included
   */
  collectMeta = async (
    pathMapping: BasePathMapping,
    prevMeta: Partial<GitMeta>
  ): Promise<Partial<GitMeta>> => {
    return {
      created_at: dayjs().add(1, "day").toJSON(),
    };
  };
}
