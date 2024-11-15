import { MdxJsxAttribute } from "mdast-util-mdx-jsx";

/**
 * Converts props to an array of MdxJsxAttribute objects.
 *
 * @template Props - The type of the props object.
 * @param {Props} props - The props object to convert.
 * @returns {MdxJsxAttribute[]} - An array of MdxJsxAttribute objects.
 */
export const propsToMdxJsxAttributes = <Props extends { [key: string]: any }>(
  props: Props
): MdxJsxAttribute[] => {
  return Object.entries(props)
    .filter(([key, value]) => value !== undefined && value !== null)
    .map(([key, value]) => ({
      type: "mdxJsxAttribute",
      name: key,
      value: value,
    }));
};
