import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import remarkVsmemoImg from "./remark-vsmemo-img";

test("content should right", () => {
  const md = `
# title

![[test.png|test]]

some other content
`;
  const processor = unified()
    .use(remarkParse)
    .use(remarkVsmemoImg, { baseDir: "test" })
    .use(remarkStringify);
  const result = processor.processSync(md).toString();
  expect(result).toBe(`# title

![test](test/test.png)

some other content
`);
});
