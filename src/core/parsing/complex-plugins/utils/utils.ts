import { MdxJsxAttribute } from "mdast-util-mdx-jsx";

/**
 * Converts props to an array of MdxJsxAttribute objects.
 *
 * - if undefined, null, false, omit the prop <Comp />
 * - if true, use only prop name <Comp show />
 * - if string, use prop name and value <Comp title="Title" />
 * - others, try to stringify the value <Comp value={{}} />
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
    .filter(([key, value]) => key !== "children")
    .filter(([key, value]) => value !== false)
    .map(([key, value]): MdxJsxAttribute => {
      if (typeof value === "string") {
        return {
          type: "mdxJsxAttribute",
          name: key,
          value: value,
        };
      }
      if (value === true) {
        return {
          type: "mdxJsxAttribute",
          name: key,
        };
      }
      return {
        type: "mdxJsxAttribute",
        name: key,
        value: {
          type: "mdxJsxAttributeValueExpression",
          value: JSON.stringify(value),
        },
      };
    });
};
