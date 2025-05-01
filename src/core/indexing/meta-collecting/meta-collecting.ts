import { BaseMeta } from "@/core/types/indexing";
import { mergeObjectIgnoreUndefined } from "@/utils/func-utils";

/**
 * A type responsible for parsing meta data for a resource.
 * Meta data is information that belongs to a specific resource, like a post's title, content, etc.
 * Meta should only contain data related to the resource itself, never depending on other resources.
 *
 * A list of collectors will be executed in order to collect meta data for a resource.
 * A collector will be executed only if some of its handleAbleKeys are not handled yet.
 *
 * After all collectors iterate, the defaultMeta will be merged with the collected meta data.
 *
 * After all collectors iterate, the defer method of each collector
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
   * Collects meta data for a resource from its file.
   * @param filePath Path to the resource file, relative to project root
   * @returns Promise resolving to partial meta data for the resource
   */
  collectMeta(
    filePath: string,
    prevMeta: Partial<Meta>
  ): Promise<Partial<Meta>>;

  /**
   * Optional deferred processing after all meta is collected.
   * Called in reverse order after all collectors finish.
   * Must not modify the meta data.
   * @param filePath Path to the resource file
   * @param meta Complete meta data collected for the resource
   */
  defer?(filePath: string, meta: Meta): Promise<void>;
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

    const partialMeta = await collector.collectMeta(filePath, meta);
    meta = mergeObjectIgnoreUndefined(meta, partialMeta);
    collectorExecuteds[i] = true;
  }

  // const fullMeta = { ...defaultMeta, ...meta };
  const fullMeta = mergeObjectIgnoreUndefined(defaultMeta, meta);

  for (let i = collectors.length - 1; i >= 0; i--) {
    if (collectorExecuteds[i]) {
      // only execute defer if the collector is executed
      const collector = collectors[i];
      await collector.defer?.(filePath, fullMeta);
    }
  }

  return fullMeta;
}
