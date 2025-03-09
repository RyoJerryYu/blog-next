import { BASE_PATH } from "./env-var";

/**
 * resolve path related to the root of the project
 *
 * we need this because Next.js doesn't support relative path except for <Link>
 * all the other places we need to use absolute path
 *
 * @param path string starting with `/`
 * @returns
 */
export const resourcePath = (path: string) => {
  return `${BASE_PATH}${path}`;
};
