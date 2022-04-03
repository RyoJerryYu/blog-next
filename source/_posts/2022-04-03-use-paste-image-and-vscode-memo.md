---
title: 完善 Hexo 编写环境，改善文章中使用图片的体验
date: 2022-04-03 21:03:03
tags:
    - Blog
    - VSCode
    - Hexo
    - JavaScript
---

我平时使用 [vscode-memo](https://github.com/svsool/vscode-memo) 插件写笔记，其中插入图片使用 `![[]]` 语法，显示简短，也有较好的预览支持，体验极佳。希望这种特性也能在写 hexo 博客的时候使用。

# 关于 vscode-memo

可能有很多人不熟悉 vscode-memo 这个插件，我先来简单介绍一下。

vscode-memo 定位是一个 knowledge base ，对标的是 [Obsidian.md](https://obsidian.md/) 等软件。其功能包括且不限于：

1. 使用独有的短链接语法 `[[]]` 连接到其他文档与图片。
2. 修改文件名时自动同步更新链接，反向查找当前文档被那些文档链接。
3. 鼠标悬停时能预览链接与图片。

同时，由于 vscode-memo 是个 vscode 插件，可以跟 vscode 的其他众多插件合作使用。比如 [vscode-memo 官方文档](https://github.com/svsool/vscode-memo/blob/master/help/How%20to/Pasting%20images%20from%20clipboard.md)里就推荐将 vscode-memo 与 vscode-past-image 插件配合，粘贴图片。

这篇文章主要的目的，也是利用这两个插件，达到把图片粘贴为短链接，并被 Hexo 正常渲染为网页。

# Image Paste 与 Hexo 的配置

这一步其实很简单。

在 Hexo 的文章中，一般需要使用从根目录起的相对链接。如有文件结构：

```tree
source
├───img
│   └───in-post
│       ├───heap-cheat-sheet.jpg
│       └───post-js-version.jpg
├───playground
└───_posts
    ├───2022-03-26-create-blog-cicd-by-github.md
    └───2022-04-03-use-paste-image-and-vscode-memo.md
```

在 `2022-03-26-create-blog-cicd-by-github.md` 中引用 `heap-cheat-sheet.jpg` 这个图片，就需要 `![](/img/in-post/heap-cheat-sheet.jpg)` 这样的链接。

但如果在配置里把 `post_asset_folder` 设为 `true` ，就可以在 Markdown 文件的同级位置的同名目录中直接找到图片。如：

```tree
source
├───img
├───playground
└───_posts
    ├───2022-03-26-create-blog-cicd-by-github
    │    ├───heap-cheat-sheet.jpg
    │    └───post-js-version.jpg
    ├───2022-03-26-create-blog-cicd-by-github.md
    └───2022-04-03-use-paste-image-and-vscode-memo.md
```

然后在 `2022-03-26-create-blog-cicd-by-github.md` 中可以直接 `![](heap-cheat-sheet.jpg)` 引用图片。为了图片文件管理方便，我们打开这个配置项。

为了能让 Image Paste 粘贴的图片能放到这个同名文件夹下，我们需要修改 Image Paste 配置，在 VSCode 的 Workspace Setting 中，添加如下设置：

```json
{
    "pasteImage.path": "${currentFileDir}/${currentFileNameWithoutExt}/"
}
```

# Image Paste 粘贴为 vscode-memo 短链接格式

这一步也很简单。 Image Paste 可以设定粘贴后的格式。我们在 Workspace Setting 中添加如下设置即可：

```json
{
    "pasteImage.insertPattern": "![[${imageFileName}]]",
}
```

这样我们粘贴后的图片就能有预览功能了。

# 让 Hexo 正确渲染 vscode-memo 的短链接

这一步其实是最难的。 Hexo 当然不认识 vscode-memo 的短链接，而经过调查，现在还没有现成的方案让 Hexo 与 vscode-memo 集成。虽然我们提倡尽量不要重复造轮子，但这里我们也是除了造轮子没有其他办法了。

我们采用的方案是让 Hexo 在渲染 Markdown 前，先把 Markdown 中形如 `![[]]` 的短链接，替换为 `![]()` 的正常 Markdown 图片链接。

假设我们项目 `source` 文件夹如下：

```tree
source
├───playground
└───_posts
    ├───2022-03-26-create-blog-cicd-by-github
    │    ├───heap-cheat-sheet.jpg
    │    └───post-js-version.jpg
    ├───2022-03-26-create-blog-cicd-by-github.md
    └───2022-04-03-use-paste-image-and-vscode-memo.md
```

如在渲染 `2022-03-26-create-blog-cicd-by-github.md` 前，需要将其中的 `![[heat-cheat-sheet.jpg]]` 替换为 `![](heap-cheat-sheet.jpg)` 。我们知道 Hexo 在生成静态文件前会先把项目根目录下 `scripts` 目录下的所有脚本执行一遍。我们可以在这里注册一个 filter ，专门做这个替换。代码如下：

```js
'use-strict';

hexo.extend.filter.register('before_post_render', function (data) {
    const isToHandle = (data) => {
        var source = data.source;
        var ext = source.substring(source.lastIndexOf('.') + 1, source.length).toLowerCase();
        return ['md'].indexOf(ext) > -1;
    }

    if (!isToHandle(data)) {
        return data;
    }

    const reg = /(\s+)\!\[\[(.+)\]\](\s+)/g;

    data.content = data.content
        .replace(reg, function (raw, start, content, end) {
            var nameAndTitle = content.split('|');
            if (nameAndTitle.length == 1) {
                return `${start}![](${content})${end}`;
            }
            return `${start}![${nameAndTitle[1]}](${nameAndTitle[0]})${end}`;
        });
    return data;

})
```

# 测试一下

文章中如下内容：

![[这部分内容会被转换为图片.png]]


而你看到上面的内容是一张图片，表示这个转换已经成功了。

# 不足之处

这一段代码仍有以下待改进的地方：
1. 如果图片短链接的内容写在 Code Block 里，也一样会被转换。实际上我们一般不希望 Code Block 里的内容被转换，需要过滤一下。
2. 形如 `![[文件|图片描述]]` 的内容会正常转换为 `![图片描述](文件)` 。然而我现在用的这个主题不支持图片描述。以后可能需要更换主题。

# 补充

如果希望网站图片放在 `img` 之类的文件夹下统一管理，不把 `post_asset_folder` 设为 `true` ，也是没问题的，可以通过修改代码，在返回 `${content}` 前添加统一前缀。

而如果希望图片放在 `img` 下，又要按文章分文件夹管理，如下情况：

```tree
source
├───img
│   ├───2022-03-26-create-blog-cicd-by-github
│   │    ├───heap-cheat-sheet.jpg
│   │    └───post-js-version.jpg
│   └───2022-04-03-use-paste-image-and-vscode-memo
├───playground
└───_posts
    ├───2022-03-26-create-blog-cicd-by-github.md
    └───2022-04-03-use-paste-image-and-vscode-memo.md
```

可以通过在代码中引用 `data.source` 解决。