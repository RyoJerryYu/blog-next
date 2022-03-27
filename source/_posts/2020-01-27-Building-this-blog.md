---
layout:     post
title:      "搭建博客的过程"
subtitle:   "记录这个博客搭建的过程，以及遇到的坑。"
date:       2020-01-27 14:00:00
author:     "Ryo"
header-img: "img/post-bg-default.jpg"
tags:
    - 杂技
    - Blog
---

> “Stop Trying to Reinvent the Wheel.”

## 博客构建


#### 把仓库clone到本地

参考[BruceZhao][BruceZhao]提供的中文翻译：[README.zh.md][READMEzh]，先将[Huxpro][Huxpro]提供的[博客模板仓库][origin_repo]fork出来，`git clone`到本地。

整个网站文件夹大致结构如下：
```
├── _config.yml
|
├── _posts/
|   ├── 2007-10-29-awsome-file-name.md
|   └── 2009-04-26-stupid-file-name.md
├── img/
|   ├── in-post/
|   ├── awsome-bg.jpg
|   ├── avatar-ryo.png
|   ├── favicon.ico
|   └── icon_wechat.jpg
├── other_awsome_directory/
|   └── awsomefiles
|
|
├── 404.html
├── about.html
├── index.html
└── other_awsome_files
```

博客的文章上传到`_posts`文件夹中，网站中用到的图片上传到`img`文件夹中，网站的全局设置在`_config.yml`中进行。



#### 修改**_config.yml**文件

修改根目录下的`_config.yml`文件，将其中的内容更改为自己的信息。

```yml
# Site settings
title: Ryo's Blog
SEOTitle: 阿亮仔的博客 | 亮のブログ | Ryo's Blog
header-img: img/home-bg.jpg
email: qq250707340@163.com
description: "君の夢が　叶うのは　誰かのおかげじゃないぜ。"
keyword: "Ryo, Blog, 阿亮仔, りょう, 博客, ブログ, Algorithm, Unity, Python, C-Sharp"
url: "http://RyoJerryYu.github.io"              # your host, for absolute URL
baseurl: ""         # for example, '/blog' if your blog hosted on 'host/blog'
github_repo: "https://github.com/RyoJerryYu/RyoJerryYu.github.io.git" # you code repository
```
- `SEOTitle`: `<title>`标签，即显示在浏览器标题中的文字。
- `header-img`: 首页显示的图像，可以把路径更改为自己的图片。
- `description`: `<meta name="description">`中的内容。
- `keyword`: `<meta name="keyword">`中的内容。
- `url`, `baseurl`: 分别为博客域名地址与其下路径。如不想将博客直接架在根路径下，需要对`baseurl`进行设置。
- `github_repo`: 博客所在的GitHub仓库。

---


```yml
# SNS settings
RSS: false
# weibo_username:     huxpro
# zhihu_username:     huxpro
github_username:    RyoJerryYu
twitter_username:  ryo_okami
# facebook_username:  huxpro
```
分别为各个社交网站上的账号信息，以供在侧边栏中直接跳转到对应的页面。可通过在行首添加或删除`#`进行注释或取消注释。

从[原仓库][origin_repo]中直接fork出来时，社交网站的图标可能会有[无法显示的问题](https://github.com/Huxpro/huxblog-boilerplate/issues/17)，其解决方法在[后面](#FixSNS)介绍。

---


```yml
# Disqus settings
#disqus_username: _your_disqus_short_name_

# Duoshuo settings
# duoshuo_username: huxblog
# Share component is depend on Comment so we can NOT use share only.
# duoshuo_share: true                     # set to false if you want to use Comment without Sharing

# Gitalk
gitalk:
    enable: false    #是否开启Gitalk评论
    clientID: f2c84e7629bb1446c1a4                            #生成的clientID
    clientSecret: ca6d6139d1e1b8c43f8b2e19492ddcac8b322d0d    #生成的clientSecret
    repo: qiubaiying.github.io    #仓库名称
    owner: qiubaiying    #github用户名
    admin: qiubaiying
    distractionFreeMode: true #是否启用类似FB的阴影遮罩  
```
分别为各种评论系统。均未开启。

---


```yml
# Analytics settings
# Baidu Analytics
# ba_track_id: 4cc1f2d8f3067386cc5cdb626a202900
# Google Analytics
ga_track_id: 'UA-156933256-1'            # Format: UA-xxxxxx-xx
ga_domain: auto
```
分别为百度与谷歌的网站统计。我只启用了Google Analytics。可先到[Google Marketing Platform](https://marketingplatform.google.com/about/)注册，开启Google Analytics。在`设置`->`媒体资源设置`中获得Track ID，并填入`ga_track_id`中。

---


```yml
# Sidebar settings
sidebar: true                           # whether or not using Sidebar.
sidebar-about-description: "记录平时遇到的问题，以及对应的解决方法。偶尔上传些许宅活或是娱乐方面的记录。"
sidebar-avatar: /img/avatar-ryo.png      # use absolute URL, seeing it's used in both `/` and `/about/`
```
`sidebar`: 是否开启侧边栏，为`true`或`false`。
`sidebar-about-description`: 显示在侧边栏中的个人简介。
`sidebar-avatar`: 显示在侧边栏中的头像。

---


```yml
# Featured Tags
featured-tags: true                     # whether or not using Feature-Tags
featured-condition-size: 2              # A tag will be featured if the size of it is more than this condition value
```
是否开启tag功能，以及最少要达到多少篇文章才能使tag显示在首页上。



#### 修改主页等信息

修改`index.html`、`404.html`、`about.html`、`tags.html`等文件，将其中的内容更改为自己的信息。

- 在`index`中，修改`description`对应的内容，亦即主页中标题下方的描述。
- 在`404`、`tags`、`about`中，修改`description`的内容，亦即404页面中的描述信息。如有需要，也可以修改`header-img`，即404页面的图片地址。
- 在`about`中，还有修改自我介绍对应的内容。



#### 修改图片信息

修改`img/`下的图片，替换为自己的图片。要记得替换以下图片：
- `avatar-ryo.png`
- `favicon.ico`
- `icon_wechat.png`



#### 修改README.md

README.md为Github仓库的介绍，可以在README.md中写上这个博客主要的内容，让别人了解这个博客。



#### 完成

将`_posts`中的博文全部删除后，将本地文件全部push到GitHub仓库中。稍等后用浏览器浏览`<用户名>.github.io`（或是你在`_config.yml`中设定的路径）。若发现网页已更新，即博客搭建成功，可以开始写博文了。

*然而，并没有成功。*



## Fix Bug

<p id = "FixReadmeCh"></p>

#### 修复README.zh.md引发的错误

按上述步骤搭建完毕后，网页并没有正常显示。此时GitHub账号所关联的邮箱中收到标题为**Page build failure**的邮件，内容如下：
> The page build failed for the `master` branch with the following error:
> The tag `if` on line 235 in `README.zh.md` was not properly closed.

如[原仓库][origin_repo]中的[issue#11](https://github.com/Huxpro/huxblog-boilerplate/issues/11)所示，在`README.zh.md`中存在`if`语句，会触发错误。

因并无其他特别的需求，此处采用暴力删除`README.zh.md`的方法解决。

对应commit：[删除README.zh.md，尝试修复因...](https://github.com/RyoJerryYu/RyoJerryYu.GitHub.io/commit/098d710160775df9b6d2cf04d7d4eec526a67bf4)


<p id = "FixSNS"></p>

#### 修复SNS链接不正常显示

修复上述错误后，稍等即可正常打开网页。但是，我们在`_config.yml`中设置好的SNS链接并没有在侧边栏以及网页底部正常显示。如原仓库中的[issue#17](https://github.com/Huxpro/huxblog-boilerplate/issues/17)所示，原因是gitpage必须通过https访问bootcss.com等的cdn。

此处采用原仓库[pull request#21](https://github.com/Huxpro/huxblog-boilerplate/pull/21)的方法，修改`_includes/head.html`, `_includes/footer.html`, `_layouts/keynote.html`, `_layouts/post.html`文件，将其中`http`修改为`https`。

对应commit：[fix: change http into https](https://github.com/RyoJerryYu/RyoJerryYu.GitHub.io/commit/ec954c380472f30f09efdfadd074cb7967c2fa11)



## 上传文章

文章主要放在_posts文件夹中，用`git push`的方式推送到GitHub仓库，即可完成文章上传。

文章正文以**markdown**语法书写，在文本头部增加如下格式的信息：
```
---
layout:     post
title:      "Welcome to Ryo's Blog!"
subtitle:   " \"Hello World, Hello Blog\""
date:       2020-01-27 12:00:00
author:     "Ryo"
header-img: "img/post-bg-default.jpg"
tags:
    - 杂技
    - 杂谈
---
```
其中：
- `layout`为文章所用的模板，可选`post`或`keynote`，也可自己写一个模板html放在`_layouts`文件夹下。
- `title`为文章标题，`subtitle`为文章副标题。
- `date`为博客中显示的文章发表时间。
- `author`为博客中显示的作者。
- `header-img`为文章顶部显示的封面。
- `tags`为文章的标签，我们的博客网站可以通过标签来快速寻找文章。

把文章的文件名命名为时间+标题的形式，后缀名使用markdown文本的通用后缀名`md`，如`2020-01-27-hello-world.md`。完成后将此文本文件放到`_posts/`文件夹下。文章中使用到的图片建议放到`img/in-post/`文件夹下。

完成后，使用`git push`推送到GitHub仓库，稍等后刷新博客网页即可看见刚才上传的文章。文章的url一般为：`<博客地址>/<文章文件名中的年>/<月>/<日>/<文件名中剩余部分>`。




## 祝你开始愉快的博客生活。


#### 感谢

- [Huxpro][Huxpro]提供的博客模板：[huxblog-boilerplate][origin_repo]
- [BruceZhao][BruceZhao]提供的中文翻译：[README.zh.md][READMEzh]
- [Luo Yifan（罗一凡）](https://github.com/iVanlIsh)提供的Bug解决方案。




[Huxpro]: https://github.com/huxpro
[BruceZhao]: https://github.com/BruceZhaoR
[origin_repo]: https://github.com/Huxpro/huxblog-boilerplate
[READMEzh]: https://github.com/Huxpro/huxpro.github.io/blob/master/README.zh.md