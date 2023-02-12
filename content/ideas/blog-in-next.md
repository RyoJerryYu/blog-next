---
title: 用 Next.js 重构 blog ，TODO list
tags:
  - Blog
  - Nextjs
---

# blog todo

## 一期

- [x] 复写 markdown parse ，增加 latex 支持
    - [x] remark-math
    - [x] rehype-katex
    - [x] rehype-slug
    - [x] https://github.com/unifiedjs/unified
    - [x] recma -> 修改 MDX , remark -> 修改 markdown ， rehype -> 修改 html
    - [x] https://www.haxibami.net/blog/posts/blog-renewal
    - [x] about img to next/Image https://zenn.dev/elpnt/articles/c17727e9d254ef00ea60
    - [x] introduction of remark https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol2/spring-raining/index.html
- [x] 下标语法行为 -> 修改默认不用 a 标签
    使用 remark gfm 后自动解决
- [x] 处理 picture 路径的问题
- [x] 默认元素映射，处理代码高亮
    - [x] mermaid 渲染
    - [x] latex 渲染 弃用，思考 remark-rehype 优先
    - [x] latex 中文渲染
    - [x] vscode-memo 语法
        - [x] 站内多媒体相对链接
    - [x] latex 显示两次
        - [x] katex 需要特殊的 css ，加载后修复
    - [x] 没有闭合的左箭头自动转义
        做不到， next-mdx-remote 调用 mdx-js ， createProcessor 中会在执行所有 remark 插件之前，先执行 remark-mdx ，无法通过插件修改 
        - https://github.com/mdx-js/mdx/tree/main/packages/remark-mdx
        - https://github.com/mdx-js/mdx/blob/main/packages/mdx/lib/core.js
- [x] 简单的样式
    - [x] Article 页面
    - [x] 主页
        - [x] 主页封面： position: static 不会反应 z-index ，需要 position: 其他值
    - [x] about 页
        - 先不做
    - [x] 其他页的最小高度，处理 footer 不要太高
    - [x] Tag 页
    - [x] Idea 页
        - [x] refactor move meta together
- [x] fix post list height
- [x] fix post list page tag box
- [x] SEO 简单
    - [x] site map https://github.com/iamvishnusankar/next-sitemap
    - [x] Header， title
    - [x] OG
        - [x] og:site_name vs og:title?
        - [x] og:url?
    - [x] footer
        - [x] icon hover 发光， bg 不要变色
        - [x] 增加 icon ， Pixiv
- [x] 处理旧链接跳转 https://www.viget.com/articles/host-build-and-deploy-next-js-projects-on-github-pages/
    - [x] path prefix
        - [x] 环境变量？配置文件？
    - [x] 代码高亮换成静态后 mermaid 也要用 remark 处理
        - [x] mermaid 内样式 -> 修复 global applyed 的行高
        - [x] 为什么 haxibami 的样式不会变？为什么是 tspan 和 text ？待探究 -> 是 pie 和 sequence 默认的
            - [x] maybe rehype-raw ？ -> 不是 rehype-raw 的问题，而且如果用 rehype-raw 会让 mdx 渲染不了显示 Cannot compile `mdxJsxFlowElement` node
            - [x] https://github.com/mermaid-js/mermaid/issues/2688
            - [x] turning the htmlLables to false fixed this (maybe other types of charts should be tested as well)
    - [x] 去除 path 中的日期
        1. get all slugs once
        2. get post meta by slug
    - [x] 修复 image url 跳转
    - [x] link jump 301 -> 308
        - 不能直接在 config 里配置，不会自动静态生成
        - 在 getStaticProps 里处理:
            - param 中拿到 slug 以 string[] 出现， slash 无关
            - build 时出现 error：`redirect` can not be returned from getStaticProps during prerendering
            - https://nextjs.org/docs/messages/gsp-redirect-during-prerender
        - 放弃治疗
- [x] git time versioning
    - [x] created at
    - [x] updated at
- [x] 部署脚本
    - [x] ghpage
        - [x] gh page 环境 path 前缀设置，
        - [x] env file 使用
    - [x] s3 test + prod
        - reusable wrokflow (on workflow call) https://docs.github.com/en/actions/using-workflows/reusing-workflows
        - composite action (no details, not to use) https://docs.github.com/en/actions/creating-actions/creating-a-composite-action
        - use artifact between workflow https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts
        - an https://stackoverflow.com/questions/70003863/reusing-github-action-workflow-steps-inside-another-job
        - gh-pages 先用蠢办法， build 上传一次 artifact ，deploy 时在 gh-pages action 里再上传一次
        - [x] Github Action 复用
        - [x] test infra stack 更新使用 s3 web hosting
        - [x] 处理 url 结尾带 slash 问题
            - https://github.com/keaeriksson/hugo-s3-cloudfront \<- 最终解决方案，用 pulumi 把这个重写一遍
            - maybe it's time to serverless https://github.com/serverless-nextjs/serverless-next.js
            - or just use vercel! 

        - [x] 更新 prod （infra ， Deploy ）
- [x] 修复 mermaid 渲染
    - [x] 方法1 remark 时处理，变静态 svg （简单）
    - [x] 方法2 highlight 推延到渲染时处理，用组件包裹 （希望优先）
        - [x] 组建渲染时快速刷新可能导致 syntax error
    - [x] 可能的处理闪动的信息： 
        - https://github.com/ant-design/ant-design/issues/16037
        - https://stackoverflow.com/questions/72248724/components-flicker-during-server-side-render-for-nextjs-and-material-ui
        - https://www.stackfive.io/work/nextjs/how-to-fix-styled-components-page-flicker-in-next-js-12
        - https://stackoverflow.com/questions/65527040/using-prism-js-line-highlight-plugin-with-next-js-app-causes-text-content-did-n
        - https://css-tricks.com/syntax-highlighting-prism-on-a-next-js-site/#aa-highlighting-lines
        - https://www.felixmokross.dev/blog/code-samples-line-highlighting
- [x] 修复：
    - [x] Home Page 下方链接点击问题
    - [x] 改进 trailing slash -> lambda 写错，要加 .html 不是 /index.html
    - [x] 排查 s3 旧文件未删除问题 rm 后加一句 ls debug
    - [x] tag box 增加 focus
- [x] reuse https://docs.github.com/en/actions/using-workflows/reusing-workflows


## 二期

- [x] favicon
- [x] Google Analytics
    - [ ] sitemap 检查
- [ ] test workflow for dependabot
- [x] SEO better, og:type=article read more: https://ogp.me/#types
- [x] 文章按创建时间倒序
- [x] 写 README 与项目简介
- [ ] Rss etc https://github.com/jpmonette/feed
- [x] 响应式适配

- tips:
    - md syntax -> mdx(react component) : use mdx provider component rewriting (code block to mermaid component)
    - md syntax -> special html -> use rehype plugin rewriting (katex, highlight)
    - special md syntax -> use remark plugin rewriting (could not to mdx, should first to html and then mdx provider rewrite)


plus:
- [ ] https://conv.denshochan.com/markdown
    - [ ] 段落内の改行
    - [ ] 行頭の文字下げ
    - [ ] Twitter アカウント
    - [ ] ルビ
    - [ ] ものルビ風の熟語ルビ
- [ ] https://www.haxibami.net/blog/posts/blog-renewal
    - [ ] link card
    - [ ] image to next image https://zenn.dev/elpnt/articles/c17727e9d254ef00ea60
    - [ ] precompile mermaid
- [ ] svg 输入
    - [ ] 绘画工具： KRITA ， 免费，有 mac os 版 https://docs.krita.org/zh_CN/user_manual.html
    - [ ] KRITA 推荐使用 Inkscape 进行编辑
- [ ] vscode 语法站内相对链接
    - [ ] mui/base could be very good
    - [ ] search lunr？ -> mini search https://www.webpro.nl/articles/how-to-add-search-to-your-static-site
        - [ ] 可以简单参考 3b1b 直接全局 hold 住，然后全文搜索
    - [ ] blog list pagition (could be later, use infinite scroll)
- [ ] nextjs 13 app directory https://beta.nextjs.org/docs/getting-started
- [ ] ja 等多语言支持
- [ ] 基于 git 的差量 build
- [ ] 组件 visual testing https://glebbahmutov.com/blog/open-source-visual-testing-of-components/
- [x] gh-pages gls 不可能，不支持
- [x] gh-pages public paths
- [ ] search console?
- [ ] 参考以下链接优化主页
    - [ ] https://meola.booth.pm/items
    - [ ] https://makoto-kaminaga.jimdofree.com/


