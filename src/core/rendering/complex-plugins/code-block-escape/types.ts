/**
 * # Code block props
 *
 * Consider a code block in markdown:
 * ````
 * ```js name thrid forth
 * console.log("Hello, World!");
 * ```
 * ````
 *
 * This code block will parsed into CodeBlockProps as:
 * ```ts
 * {
 *   lang: "js",
 *   meta: "name thrid forth",
 *   value: "console.log(\"Hello, World!\");"
 * }
 * ```
 */
export type CodeBlockProps = {
  lang?: string | null;
  meta?: string | null;
  value: string;
};
