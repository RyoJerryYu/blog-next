import { unified } from "unified";
import parser from "remark-parse";
import toHast from "remark-rehype";
import compiler from "rehype-stringify";
import { inspect } from "unist-util-inspect";
import { visit } from "unist-util-visit";


function isImg(
  node
) {
  console.log("isImg");
  console.log(node);
  return node.tagName === "img";
}

function visitor(
  node, index, parent
) {
  console.log("visiting image node")
  console.log(node);
  console.log(index);
  console.log(parent);
  parent.children[index] = {
    type: "element",
    tagName: "Image",
    properties: node.properties,
  };
}

const realPlugin = () => {
  return (node) => {
    visit(node, isImg, visitor);
  };
}

const printI = (name)=> {
  return () => {
    return (node) => {
      console.log(`inspect on ${name}`);
      console.log(inspect(node));
    };
  }
}

const processor = unified()
  .use(parser)
  .use(printI('after parser'))
  .use(toHast)
  .use(printI('after toHast'))
  .use(realPlugin)
  .use(printI('after realPlugin'))
  .use(compiler)

const markdown = `
# Hello, world!
some other
text
![title](https://some/image.png "trueTitle")
`

const res = processor.processSync(markdown).toString();
console.log(res);
