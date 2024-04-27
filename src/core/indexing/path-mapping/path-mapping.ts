import { BasePathMapping } from "../../types/indexing";

/**
 * A type of PathMapper responsible for mapping for a type of resource
 * Though filePath is not unique between two types of resources,
 * it should be unique for one type of resource.
 * So filePath is used as the key for the mapping.
 *
 * @template PathMapping the type of path mapping for this type of resource
 */
export interface PathMapper<PathMapping extends BasePathMapping> {
  listFilePaths: () => Promise<string[]>;
  filePath2PathMapping: (filePath: string) => PathMapping;
}

export const listPathMappings = async <PathMapping extends BasePathMapping>(
  pathMapper: PathMapper<PathMapping>
) => {
  const existPath: Set<string> = new Set();
  const filePaths = await pathMapper.listFilePaths();
  return filePaths.map((filePath) => {
    if (existPath.has(filePath)) {
      throw new Error(`Duplicate filePath: ${filePath}`);
    }
    return pathMapper.filePath2PathMapping(filePath);
  });
};
