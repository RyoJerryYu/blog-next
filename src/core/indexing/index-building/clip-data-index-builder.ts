import * as fs from "fs";
import { ResourceMeta } from "../meta-collecting/meta-collecting";
import { ResourcePathMapping } from "../path-mapping/path-mapping";
import { IndexBuilder, Resource } from "./index-building";

export type ClipData = {
  id: string;
  title: string;
  url: string;
  tags: string[];
  created_time: string;
};

export class ClipDataIndexBuilder
  implements
    IndexBuilder<ResourcePathMapping, ResourceMeta, ClipData[], "clipData">
{
  addResource = (
    resourceType: string,
    resource: Resource<ResourcePathMapping, ResourceMeta>
  ) => {};
  buildIndex = async (): Promise<{ clipData: ClipData[] }> => {
    const data = await fs.promises.readFile("public/data/clips.json", "utf-8");
    const clipData = JSON.parse(data).pages;
    return { clipData: clipData };
  };
}