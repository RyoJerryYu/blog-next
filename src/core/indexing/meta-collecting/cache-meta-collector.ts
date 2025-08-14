import { BaseMeta, BasePathMapping } from "@/core/types/indexing";
import dayjs from "dayjs";
import fs, { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import git from "isomorphic-git";
import { dirname } from "path";
import { dayJsFromCommit } from "../utils/git-utils";
import { MetaCollector } from "./meta-collecting";

/**
 * A collector that caches meta data to JSON files to improve performance.
 * Meta data is information that belongs to a specific resource, never depending on other resources.
 *
 * This collector reads from and writes to cache files in the specified cache directory.
 * Cache is considered expired if the source file has been modified more recently than the cache file.
 * Certain fields can be excluded from caching via exceptFields.
 *
 * After all collectors iterate, this collector's defer method will write the complete meta data
 * to a cache file, excluding any specified fields.
 *
 * @template Meta The type of meta data being cached
 */
export class CacheMetaCollector<Meta extends BaseMeta>
  implements MetaCollector<Meta>
{
  /**
   * @param gitDir Directory containing git repository
   * @param cacheDir Directory to store cache files
   * @param exceptFields Meta fields that should not be cached
   */
  constructor(
    readonly gitDir: string,
    readonly cacheDir: string,
    readonly exceptFields: (keyof Meta)[]
  ) {}

  /**
   * Converts a source file path to its corresponding cache file path
   */
  filePathToCachePath = (filePath: string) => {
    return `${this.cacheDir}/${filePath}.json`;
  };

  /**
   * This collector can handle all meta fields, though some may be excluded via exceptFields
   */
  handleAbleKeys = (): "*" => {
    return "*";
  };

  /**
   * Gets the last modification time of a file from git history
   * @param filePath Path to the file
   * @returns Dayjs object representing last commit time
   */
  updatedAtFromGit = async (filePath: string): Promise<dayjs.Dayjs> => {
    const commits = await git.log({ fs, dir: this.gitDir, filepath: filePath });
    return dayJsFromCommit(commits[0]);
  };

  /**
   * Checks if the cache for a file is expired by comparing git timestamps
   * @param filePath Path to the source file
   * @returns True if cache needs to be regenerated
   */
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

  /**
   * Collects meta data for a resource from its cache file if available and not expired.
   * Meta data is information that belongs to a specific resource, never depending on other resources.
   *
   * @param pathMapping Path mapping for the resource
   * @returns Promise resolving to cached meta data with excluded fields removed, or empty object if cache invalid
   */
  collectMeta = async (
    pathMapping: BasePathMapping,
    prevMeta: Partial<Meta>
  ): Promise<Partial<Meta>> => {
    const filePath = pathMapping.filePath;
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

  /**
   * Deferred processing to write meta data to cache file after collection is complete.
   * Called in reverse order after all collectors finish.
   * Creates cache directory if it doesn't exist.
   * Excludes specified fields from being cached.
   * Must not modify the meta data.
   *
   * @param pathMapping Path mapping for the resource
   * @param meta Complete meta data to cache
   */
  defer = async (pathMapping: BasePathMapping, meta: Meta): Promise<void> => {
    const filePath = pathMapping.filePath;
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
