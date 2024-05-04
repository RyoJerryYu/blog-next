import { BaseMeta } from "@/core/types/indexing";
import dayjs from "dayjs";
import fs, { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import git from "isomorphic-git";
import { dirname } from "path";
import { dayJsFromCommit } from "../utils/git-utils";
import { MetaCollector } from "./meta-collecting";

export class CacheMetaCollector<Meta extends BaseMeta>
  implements MetaCollector<Meta>
{
  constructor(
    readonly gitDir: string,
    readonly cacheDir: string,
    readonly exceptFields: (keyof Meta)[]
  ) {}

  filePathToCachePath = (filePath: string) => {
    return `${this.cacheDir}/${filePath}.json`;
  };

  handleAbleKeys = (): "*" => {
    return "*";
  };

  updatedAtFromGit = async (filePath: string): Promise<dayjs.Dayjs> => {
    const commits = await git.log({ fs, dir: this.gitDir, filepath: filePath });
    return dayJsFromCommit(commits[0]);
  };

  cacheExpired = async (filePath: string): Promise<boolean> => {
    try {
      const fileUpdatedAt = await this.updatedAtFromGit(filePath);
      const cachePath = this.filePathToCachePath(filePath);
      if (!existsSync(cachePath)) {
        return true;
      }
      const cacheUpdatedAt = await this.updatedAtFromGit(cachePath);
      return fileUpdatedAt.isAfter(cacheUpdatedAt);
    } catch (e) {
      // any error occurs, treat as expired
      return true;
    }
  };

  collectMeta = async (filePath: string): Promise<Partial<Meta>> => {
    const cachePath = this.filePathToCachePath(filePath);
    if (await this.cacheExpired(filePath)) {
      return {};
    }

    console.log(`load cache for ${filePath} from ${cachePath}`);
    const file = await readFile(cachePath, { encoding: "utf-8" });
    console.log(file);
    const meta = JSON.parse(file);
    if (this.exceptFields) {
      for (const field of this.exceptFields) {
        delete meta[field];
      }
    }
    return meta;
  };
  defer = async (filePath: string, meta: Meta): Promise<void> => {
    const cachePath = this.filePathToCachePath(filePath);
    if (!existsSync(dirname(cachePath))) {
      console.log(`create cache dir for ${filePath} to ${cachePath}`);
      await mkdir(dirname(cachePath), { recursive: true });
    }
    console.log(`defer write cache for ${filePath} to ${cachePath}`);
    const cacheMeta = { ...meta };
    if (this.exceptFields) {
      for (const field of this.exceptFields) {
        delete cacheMeta[field];
      }
    }
    await writeFile(cachePath, JSON.stringify(cacheMeta), {
      flag: "w+",
      encoding: "utf-8",
    });
  };
}
