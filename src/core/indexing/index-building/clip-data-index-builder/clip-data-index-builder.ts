import * as fs from "fs";
import { BaseMeta, BasePathMapping, Resource } from "../../../types/indexing";
import { IndexBuilder, getIndexFromIndexPool } from "../index-building";
import { ClipData } from "./types";

export class ClipDataIndexBuilder
  implements IndexBuilder<BasePathMapping, BaseMeta, ClipData[], "clipData">
{
  addResource = (
    resourceType: string,
    resource: Resource<BasePathMapping, BaseMeta>
  ) => {};
  buildIndex = async (): Promise<{ clipData: ClipData[] }> => {
    const data = await fs.promises.readFile("public/data/clips.json", "utf-8");
    const clipData = JSON.parse(data).pages;
    return { clipData: clipData };
  };
}

export const clipDataFromPool = getIndexFromIndexPool<ClipData[]>("clipData");
