import * as fs from "fs";
import { BasePathMapping } from "../../types/indexing";
import { BaseMeta } from "../meta-collecting/meta-collecting";
import { IndexBuilder, Resource } from "./index-building";

export type ClipData = {
  id: string;
  title: string;
  url: string;
  tags: string[];
  created_time: string;
};

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
