import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

test("code fields", () => {
  unified().use(remarkParse).use(remarkRehype);
});
