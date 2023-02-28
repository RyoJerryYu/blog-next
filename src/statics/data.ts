import * as fs from "fs";

export type ClipData = {
  id: string;
  title: string;
  url: string;
  tags: string[];
  created_time: string;
};

export function loadClipData(): ClipData[] {
  const data = fs.readFileSync("public/data/clips.json", "utf-8");
  return JSON.parse(data).pages;
}
