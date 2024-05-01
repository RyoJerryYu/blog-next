import { BaseMeta, BasePathMapping, Resource } from "@/core/types/indexing";

export type PrevNextIndexMeta = BaseMeta & {
  title: string;
  created_at: string | null;
  updated_at: string | null;
};
export type PrevNextIndexResource = Resource<
  BasePathMapping,
  PrevNextIndexMeta
>;
export type PrevNextInfo = {
  prevInfo: PrevNextIndexResource | null;
  nextInfo: PrevNextIndexResource | null;
};
