import { mergeObjectIgnoreUndefined } from "@/utils/merge-object";

/**
 * One resource on the site could have it's own meta data.
 * Different types of resources may have different type of meta data.
 *
 * Mostly meta will be a parameter of it's page component and used for rendering.
 * So, meta must be json serializable.
 * Optional fields should have type as T | null, not T | undefined.
 */
export type BaseMeta = {};

/**
 * The meta data for a post should have.
 */
export type PostMeta = BaseMeta & {
  content: string;
  title: string;
  abstract: string;
  length: number;
  created_at: string | null;
  updated_at: string | null;
  tags: string[];
  license: boolean;
};

/**
 * A type responsible for parsing meta data for a resource.
 * A list of collectors will be executed in order to collect meta data for a resource.
 * A collector will be executed only if some of it's handleAbleKeys are not handled yet.
 *
 * After all collectors iterated, the defaultMeta will be merged with the collected meta data.
 *
 * After all collectors iterated, the defer method of each collector
 * will be executed in reverse order.
 * Should never modify the meta data in defer method.
 *
 * Consider there should be a need for expand the keys of meta data,
 * ~~we strongly recommend to implement a meta collector with type parameter as Required<Meta>.~~
 * TypeScript does the best for expanding type, so we don't need to do this.
 *
 * @template Meta the type of meta data for this type of resource
 */
export interface MetaCollector<Meta extends BaseMeta> {
  /**
   * The keys of meta data that this collector can handle.
   * return "*" if this collector can handle all keys.
   */
  handleAbleKeys(): Array<keyof Meta> | "*";
  collectMeta(filePath: string): Promise<Partial<Meta>>;
  defer?(meta: Meta): void;
}

/**
 * A chain defines how meta of one type of resource should be collected.
 */
export type MetaCollectorChain<Meta extends BaseMeta> = {
  readonly collectors: MetaCollector<Meta>[];
  readonly defaultMeta: Meta;
};

/**
 * collect meta data for a file path.
 * The collectors will be executed in order.
 * The defaultMeta will be merged with the collected meta data.
 *
 * @param filePath the file path of the resource
 * @param collectors the chain of meta collectors, will be executed in order
 * @param defaultMeta the default meta data will be merged with the collected meta data
 */
export async function collectMetaForFilePath<Meta extends BaseMeta>(
  { collectors, defaultMeta }: MetaCollectorChain<Meta>,
  filePath: string
): Promise<Meta> {
  let meta: Partial<Meta> = {};
  const collectorExecuteds = new Array<boolean>(collectors.length).fill(false);
  for (let i = 0; i < collectors.length; i++) {
    const collector = collectors[i];
    const handleAbleKeys = collector.handleAbleKeys();
    if (
      handleAbleKeys !== "*" &&
      handleAbleKeys.every((key) => meta[key] !== undefined)
    ) {
      // do not be able to handle all keys and
      // every handleAbleKeys is already handled
      // skip this collector
      continue;
    }

    const partialMeta = await collector.collectMeta(filePath);
    // meta = { ...partialMeta, ...meta };
    meta = mergeObjectIgnoreUndefined(partialMeta, meta);
    collectorExecuteds[i] = true;
  }

  // const fullMeta = { ...defaultMeta, ...meta };
  const fullMeta = mergeObjectIgnoreUndefined(defaultMeta, meta);

  for (let i = collectors.length - 1; i >= 0; i--) {
    if (collectorExecuteds[i]) {
      // only execute defer if the collector is executed
      const collector = collectors[i];
      collector.defer?.(fullMeta);
    }
  }

  return fullMeta;
}
