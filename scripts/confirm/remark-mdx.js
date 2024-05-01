
import { compile } from "@mdx-js/mdx";
import compiler from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdx from "remark-mdx";
import parser from "remark-parse";
import toHast from "remark-rehype";
import { unified } from "unified";
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
  console.log("visiting text node")
  console.log(node);
  console.log(index);
  const value = node.value;

  // parent.children[index] = {
  //   type: "text",
  //   tagName: "Image",
  //   properties: node.properties,
  // };
}

const remarkEscape = () => {
  return (node) => {
    visit(node, "text", (node) => {
      node.value = node.value.replace(/</g, "\\\\<");
      node.value = node.value.replace(/>/g, "\\\\>");
    });
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
  .use(remarkMdx)
  // .use(printI('after parser'))
  .use(remarkGfm)
  // .use(printI('after remarkGfm'))
  .use(remarkMath)
  .use(printI('after remarkMath'))
  .use(remarkEscape)
  .use(printI('after realPlugin'))
  .use(toHast)
  // .use(printI('after toHast'))
  .use(compiler)

const markdown = `
# Hello, world!
some other<License />
text

![title](https://some/image.png "trueTitle")

<License />

| 名称空间     | 隔离内容                      | 内核版本 |
| :----------- | :---------------------------- | :------- |
| Mount        | 文件系统与路径等              | 2.4.19   |
| UTS          | 主机的Hostname、Domain names  | 2.6.19   |
| IPC          | 进程间通信管道                | 2.6.19   |
| PID          | 独立的进程编号空间            | 2.6.24   |
| Network      | 网卡、IP 地址、端口等网络资源 | 2.6.29   |
| User         | 进程独立的用户和用户组        | 3.8      |
| Cgroup       | CPU 时间片，内存分页等        | 4.6      |
| Time \\<- New! | 进程独立的系统时间            | 5.6      |

`

const res = processor.processSync(markdown).toString();
console.log(res);

async function serimdx() {
  const mdxSource = await compile(markdown, {
    format: "mdx",
    
      remarkPlugins: [
        remarkGfm,
        remarkMath,
        remarkEscape,
      ],
      rehypePlugins: [
      ],
  });
  console.log(mdxSource);
}

// serimdx();
