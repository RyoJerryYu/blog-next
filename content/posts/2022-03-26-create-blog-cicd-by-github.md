---
created_at: 2022-03-26 23:55:08
updated_at: 2022-03-27 21:31:04+08:00
title: 用 GitHub Action 自动化构建 Hexo 并发布到 S3
date: 2022-03-26 23:55:08
tags: 
    - Blog
    - GitHub
    - AWS
    - CI/CD
    - IaC
    - DevOps
---

GitHub Action 自动化构建发布到 GitHub Pages 大家都见得多了，甚至 Hexo 官方自己都有相关的文档。
但我今天要做的不是发布到 GitHub 这么简单，而是要同时发布到 GitHub 和自己的域名下。

# 这篇文章的目标

我们需要构建一个 CI/CD 过程。这个过程需要做到以下目标：
1. 将文章 push 到 GitHub 的 master branch 后，自动触发。
2. 我们博客使用 Hexo 引擎，需要先构建静态文件。
3. 需要将静态文件部署到 GitHub Page 。
4. 需要将静态文件部署到自己域名下。
    这里我们使用 AWS 的 S3 服务与 CloudFront 服务直接部署到 CDN 上。 CloudFront 直接通过 OAI 访问 S3 ，不允许用户直接通过 S3 访问。
5. 博客在 GitHub Page 与 S3 需要处于不同的路径下。
    为了延续以往的情况，博客在 GitHub Page 需要部署在 `/blog/` 下。
    而在 AWS 上我则希望直接部署在根目录下，这就导致需要两份配置文件。
    当然弄两份配置文件我是不乐意的，于是就需要从模板自动生成配置文件...

其中，一二三点都很好解决，而第四点会是一个比较难又比较坑爹的地方。

# 先做简单的 —— CI/CD 构建并发布到 GitHub Pages

这一步其实没什么难的， Hexo 官网上就有[这篇文章](https://hexo.io/docs/github-pages.html)写的十分详细了，可以作为参考。

```yaml
name: Pages

on:
  push:
    branches:
      - master  # default branch

jobs:
  pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 16.x
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Cache NPM dependencies
        uses: actions/cache@v2
        with:
          path: node_modules
          key: ${{ runner.OS }}-npm-cache
          restore-keys: |
            ${{ runner.OS }}-npm-cache
      - name: Install Dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages  # deploying branch
```

这个 yaml 就是 GitHub Action 的 workflow 文件，在这个 workflow 里：
1. 先用 `npm run build` 把静态文件生成到 `./public` 下
2. 用 `peaceiris/actions-gh-pages@v3` 这个 action 把 `./public` 的文件放到 `gh-pages` 分支下。

把上面这个 yaml 文件复制到 `.github/workflows/build.yml` 中，这样 master 分支上发生任何提交都会触发构建流程了。按照 Hexo 官网上的文档跑一边就能成功发布到 GitHub Pages 上了。

不过我需要部署到 `/blog/` 下，这叫 Project Page ，因此我走的是 Hexo 文档的 Project Page 这一小节的流程，需要把 `_config.yml` 里做如下设置：

```yaml
url: https://ryojerryyu.github.io/blog # 这个其实不是很重要，现在用的主题没有用到这个字段
root: /blog/ # 这个比较重要，这个不设定好，整个页面的超链接都会歪掉
```

当然， “没什么难” 的前提是你首先要对 Hexo 和 GitHub Action 有一个了解...

# 难一点 —— 搭建 AWS 基础设施

我为什么不止用 GitHub Pages 还要配一套 AWS 呢？其实主要还是想以后可能会做一下 Backend ，而且放 AWS 上还能利用 AWS 的服务做一下流量分析之类的。没这么些需求的小伙伴可以不用继续看了...

我们打算使用 AWS 的 S3 与 CloudFront 服务， CloudFront 直接通过 OAI 访问 S3 。

## S3

S3 是 AWS 的对象储存服务，简单来说就是可以当网盘用，往里面放文件。
S3 有静态网站托管服务，把静态文件放到 S3 里，配置一番就直接可以通过 HTTP 访问了，还能用自己的域名。
但我们不打算使用 S3 的静态网站托管，因为我打算直接上 CDN ，又不想用户可以直接通过 S3 来访问我们的静态文件。

## CloudFront

CloudFront 是 AWS 的内容分发服务，简单来说就是 CDN 。其实它不只有 CDN 的功能，它还能加速动态调用，还能通过 CloudFront 连接 Web Socket ... 不过我们这次主要是用 CDN 功能。
CloudFront 访问 S3 的方式还是有好几种的。中文教程最常见的是让你先打开 S3 静态网站托管，然后将 CloudFront 的源设为 S3 的域名。
这个方法是最早支持的，因此推广的也比较开。但其实我觉得这个方法有些问题：

1. S3 不做另外配置的话是可以直接访问的，比较 low
2. S3 自己的 HTTP Endpoint 不能上 TLS ，所以 CloudFront 到 S3 这一段是裸奔的

因此我打算使用 AWS 最近推荐的 OAI 方式访问 S3 。这种方式不走 HTTP Endpoint 而是 S3 自己的 S3 Endpoint ，可以通过 AWS 的 IAM 机制统一管理。
OAI 是 Origin Access Identity ，简单来说就是给 CloudFront 一个 AWS IAM Policy 的 Principal 身份， S3 可以通过如下 Bucket Policy 限制外部只能通过这个 Principal 访问：
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::cloudfront:user/<CloudFront Origin Access Identity ID>"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<bucket name>/*"
        }
    ]
}
```
上面这一段看不懂的同学，可以去补习一下 AWS IAM 权限管理机制，关键就是 Principal —— 主体 、 Action —— 动词 、 Resource —— 受体 的一个主谓宾模式。

## 其他 AWS 服务

当然，仅有 S3 和 CloudFront 是不足以实现全部功能的，我们还需要 Route53 来管理路由， ACM 来获取免费证书。
但这些我都不打算细讲，因为内容真的很多-_-，而且大部分都是 AWS 的细节，搬到别的云上不一定适用...而且手动操作麻烦死了...

## Pulumi

综上嘛，我们需要：
1. 建一个 Route53 Hosted Zone ，把域名交给 Route53 管理
2. 用 ACM 给域名申请一个 us-east-1 Region 的免费证书（CloudFront 的证书必须在 us-east-1 ）
3. 建一个 S3 储存桶，把 Public Access Block 配置一下
4. 建一个 CloudFront Distribution ，通过 OAI 来访问 S3 ，还要指定一下证书
5. 给 S3 配一个 Bucket Policy ，允许 CloudFront 访问
6. 把 Route53 里的域名弄个 DNS 记录指向 CloudFront

手动操作麻烦死了，于是我打算用 IaC (Infrastructure-as-Code) 来解决。我把这些基础设施定义用 Pulumi 写成的代码放在[这里](https://github.com/RyoJerryYu/aws-blog-infra/tree/c97f0fe41b5c0306d5343ddfc22f4a3775d79b88/website)了，大家可以参考一下（做了模块化，跟我其他基础设施放一起了）。

当然，用 Pulumi 没什么特别原因，纯粹是因为我最近在写 Pulumi... 你完全可以用其他 IaC 工具（Ansible、Terraform、CloudFormation）来做。而且 Pulumi 太新了，用起来挺多 Bug 的...（也许是我不会用）

## 测试一下

S3 桶啥的都建好之后，本地把文件 build 一下，用 `aws s3 cp ./public/ s3://<bucket>/ --recursive` 之类的命令上传到 S3 ，给 CloudFront 创建一个 Invalidation 刷新一下 CloudFront 缓存，访问域名看看，有返回个 HTML 我们的基础设施就算是跑通了。此时可能会出现以下情况，都属正常：
1. 访问返回 307 ：
    是 S3 储存桶 Region 不在 us-east-1 导致的。
    CloudFront 是通过 s3 的 global endpoint 访问 s3 的，但不在 us-east-1 的 s3 刚新建时还不能通过 global endpoint 访问。
    参考 so 的[这个问题](https://stackoverflow.com/questions/38706424/aws-cloudfront-returns-http-307-when-origin-is-s3-bucket)：

    > All buckets have at least two REST endpoint hostnames. In eu-west-1, they are example-bucket.s3-eu-west-1.amazonaws.com and example-bucket.s3.amazonaws.com. The first one will be immedately valid when the bucket is created. The second one -- sometimes referred to as the "global endpoint" -- which is the one CloudFront uses -- will not, unless the bucket is in us-east-1. Over a period of seconds to minutes, variable by location and other factors, it becomes globally accesible as well. Before that, the 307 redirect is returned. Hence, the bucket was not ready.
    
    这时候只要等个十几分钟就好了。
2. 本地 build 的时候没配置好的话，js 之类的静态文件可能返回不了，但问题不大，我们接下来再处理。


# 搭建 S3 的 workflow

基础设施搭好了，我们就要像 deploy 到 GitHub Pages 一样，造一个自动管线发布到 S3 了。
整理一下，我们的 workflow 里要包括：

1. 从模板生成配置文件
    别忘了，我需要的是静态文件部署在 GitHub Pages 和自己域名下的不同路径上。 Hexo 生成静态文件前配置文件必须要改的。
2. 把原先 s3 上的文件删除，并上传新的文件到 s3
3. 给 CloudFront 创建一个 Invalidation 刷新缓存

## 生成配置文件

这一步其实方案很多，甚至 bash 直接全文替换都可以...
不过怕以后要改的东西变多，这里还是选择一些模板生成工具。有如下选择：

1. 屠龙刀 Ansible
2. Python Jinja2
3. Go Template

这里用 Ansible 确实是大材小用了，而且 Ansible 不能在 Windows 下用还是有点不方便，只能弃选。而 Python 和 Go 里我选了 Go Template ，原因是... 不想写 Python...
这里其实确实是装逼了，这种小型脚本应该 Python 比 Go 合适的多。不过还好 Go run 可以不先 go mod 就能运行，不算是个太差的选择。不过以后还是大概率要改回 Python 。

写 golang 脚本没有难度，大致如下：

golang template 的 name 要是 file name
```golang
name := path.Base(*tmpl)
t := template.Must(template.New(name).ParseFiles(*tmpl))
err = t.Execute(os.Stdout, config)
if err != nil {
    log.Fatal(err)
}
```
github workflow 如下
```yaml            
- name: Use Go 1.16
    uses: actions/setup-go@v1
    with:
    go-version: '1.16.1'

- name: generate config
    run: go run ./genconfig/main.go --env=gh-pages > _config.yml

```
windows 玩家可能要注意一下，windows 下编码有问题， `go run ./genconfig/main.go --env=gh-pages > _config.yml` 这段命令直接在 PowerShell 下跑生成出来的文件不能被 Hexo 识别。不过没什么关系，反正这段到时候是在 GitHub Action Runner 上跑的，只不过是不能本地生成用来测试而已。

[参考代码](https://raw.githubusercontent.com/RyoJerryYu/blog/2f407cb6ee723d0e17c97af1289bd2231bb265ab/genconfig/main.go)

## 上传 s3 与刷新 CloudFront

后两步搜一下发现其实有很多现成的 GitHub Action 可以用。
不过我没有采用，原因是——真的没必要啊...就几个命令的事，又不是不会敲...

workflows yaml 如下：
```yaml
- name: Configure AWS
    uses: aws-actions/configure-aws-credentials@v1
    with:
        aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
        aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
        aws-region: ap-northeast-1
- name: Deploy
    env:
        S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
        DISTRIBUTION_ID: ${{ secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID }}
    run: |
        aws s3 rm s3://$S3_BUCKET/* --recursive
        aws s3 cp ./public s3://$S3_BUCKET/ --recursive
        aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths '/*' --region=us-east-1
```

[完整 yaml 参考代码](https://raw.githubusercontent.com/RyoJerryYu/blog/f0affb812f2de437943d9cf2a4f8a5fe690d1efd/.github/workflows/clouds.yml)

由于改为了生成配置文件， deploy 到 Github Pages 的 yaml 也要做相应改动，这里就不多说。

# CloudFront 的一点小问题（不太小）

这样我们的整个流程是不是跑完了？我们的博客已经部署到自己的域名下了？
浏览器打开自己的域名看看，完美显示！

等等，别高兴的太早，点进去一篇文章... 403 了...

403 的原因：
1. hexo 生成出来的 page 连接是 `/` 结尾的，如 `/2022/03/26/create-blog-cicd-by-github/` ，然后通过 HTTP 服务器的自动转义指向 `/2022/03/26/create-blog-cicd-by-github/index.html` 文件。
2. CloudFront 可以定义默认根对象，没有为每个子路径都自动转义的功能。
3. S3 的 HTTP endpoint 可以配置索引文档，为每个子路径自动转义，但 CloudFront 通过 OAI 访问 S3 时通过 REST endpoint 访问，不会触发自动转义。

一大波参考阅读：

[Specifying a default root object](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html)
> Here's an example of how a default root object works. Suppose the following request points to the object image.jpg:
> ```
> https://d111111abcdef8.cloudfront.net/image.jpg
> ```
> In contrast, the following request points to the root URL of the same distribution instead of to a specific object, as in the first example:
> ```
> https://d111111abcdef8.cloudfront.net/
> ```
> When you define a default root object, an end-user request that calls the root of your distribution returns the default root object. For example, if you designate the file index.html as your default root object, a request for:
> ```
> https://d111111abcdef8.cloudfront.net/
> ```
> Returns:
> ```
> https://d111111abcdef8.cloudfront.net/index.html
> ```
> However, if you define a default root object, an end-user request for a subdirectory of your distribution does not return the default root object. For example, suppose index.html is your default root object and that CloudFront receives an end-user request for the install directory under your CloudFront distribution:
> ```
> https://d111111abcdef8.cloudfront.net/install/
> ```
> CloudFront does not return the default root object even if a copy of index.html appears in the install directory.
> 
> If you configure your distribution to allow all of the HTTP methods that CloudFront supports, the default root object applies to all methods. For example, if your default root object is index.php and you write your application to submit a POST request to the root of your domain (http://example.com), CloudFront sends the request to http://example.com/index.php.
> 
> The behavior of CloudFront default root objects is different from the behavior of Amazon S3 index documents. When you configure an Amazon S3 bucket as a website and specify the index document, Amazon S3 returns the index document even if a user requests a subdirectory in the bucket. (A copy of the index document must appear in every subdirectory.) For more information about configuring Amazon S3 buckets as websites and about index documents, see the Hosting Websites on Amazon S3 chapter in the Amazon Simple Storage Service User Guide.

[Configuring an index document](https://docs.aws.amazon.com/AmazonS3/latest/userguide/IndexDocumentSupport.html)
> In Amazon S3, a bucket is a flat container of objects. It does not provide any hierarchical organization as the file system on your computer does. However, you can create a logical hierarchy by using object key names that imply a folder structure.
> 
> For example, consider a bucket with three objects that have the following key names. Although these are stored with no physical hierarchical organization, you can infer the following logical folder structure from the key names:
> - sample1.jpg — Object is at the root of the bucket.
> - photos/2006/Jan/sample2.jpg — Object is in the photos/2006/Jan subfolder.
> - photos/2006/Feb/sample3.jpg — Object is in the photos/2006/Feb subfolder.
> 
> In the Amazon S3 console, you can also create a folder in a bucket. For example, you can create a folder named photos. You can upload objects to the bucket or to the photos folder within the bucket. If you add the object sample.jpg to the bucket, the key name is sample.jpg. If you upload the object to the photos folder, the object key name is photos/sample.jpg.
> 
> If you create a folder structure in your bucket, you must have an index document at each level. In each folder, the index document must have the same name, for example, index.html. When a user specifies a URL that resembles a folder lookup, the presence or absence of a trailing slash determines the behavior of the website. For example, the following URL, with a trailing slash, returns the photos/index.html index document.
> ```
> http://bucket-name.s3-website.Region.amazonaws.com/photos/
> ```
> 
> However, if you exclude the trailing slash from the preceding URL, Amazon S3 first looks for an object photos in the bucket. If the photos object is not found, it searches for an index document, photos/index.html. If that document is found, Amazon S3 returns a 302 Found message and points to the photos/ key. For subsequent requests to photos/, Amazon S3 returns photos/index.html. If the index document is not found, Amazon S3 returns an error.

[Implementing Default Directory Indexes in Amazon S3-backed Amazon CloudFront Origins Using Lambda@Edge](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/)
> If you implement CloudFront in front of S3, you can achieve this by using an OAI. However, in order to do this, you cannot use the HTTP endpoint that is exposed by S3’s static website hosting feature. Instead, CloudFront must use the S3 REST endpoint to fetch content from your origin so that the request can be authenticated using the OAI. This presents some challenges in that the REST endpoint does not support redirection to a default index page.

> CloudFront does allow you to specify a default root object (index.html), but it only works on the root of the website (such as http://www.example.com > http://www.example.com/index.html). It does not work on any subdirectory (such as http://www.example.com/about/). If you were to attempt to request this URL through CloudFront, CloudFront would do a S3 GetObject API call against a key that does not exist.



那么，我们要怎么解决这个问题呢？我觉得，这个问题有三种解决方法：

1. 不使用 OAI ，让 CloudFront 直接指向 S3 的域名，让 CloudFront 使用 S3 HTTP Endpoint 的特性
2. 调整 Hexo 配置，更改生成文件路径或连接路径
3. 使用 AWS 推荐的 Lambda@Edge 功能，在 CloudFront 上修改路径

其中第二种方案是最下策，我们不能在还有其他方案的情况下，因为基础设施的一个性质就去修改我们的产品。况且我们的产品在大多数场景下都是适用的。
第一种方案是中策，也许实行起来也是最简单的。但我不想用，原因上面也说过了。
第三种方案是实施起来难度最大的，我们要引入 Lambda 这一新概念。但反正折腾嘛，试试就试试，反正失败了再变回第一种方案就是。

## 创建 Lambda

[Implementing Default Directory Indexes in Amazon S3-backed Amazon CloudFront Origins Using Lambda@Edge](https://aws.amazon.com/blogs/compute/implementing-default-directory-indexes-in-amazon-s3-backed-amazon-cloudfront-origins-using-lambdaedge/)

参考上面的文档，我们直接在 Console 创建一个 Lambda 函数，内容如下：

```javascript
'use strict';
exports.handler = (event, context, callback) => {
    
    // Extract the request from the CloudFront event that is sent to Lambda@Edge 
    var request = event.Records[0].cf.request;

    // Extract the URI from the request
    var olduri = request.uri;

    // Match any '/' that occurs at the end of a URI. Replace it with a default index
    var newuri = olduri.replace(/\/$/, '\/index.html');
    
    // Log the URI as received by CloudFront and the new URI to be used to fetch from origin
    console.log("Old URI: " + olduri);
    console.log("New URI: " + newuri);
    
    // Replace the received URI with the URI that includes the index page
    request.uri = newuri;
    
    // Return to CloudFront
    return callback(null, request);

};
```
这一段代码主要作用是把接收到每个以 `/` 结尾的请求，都转换为以 `/index.html` 结尾的请求。

Deploy 之后，为 Lambda 添加 Trigger ，选择 CloudFront 作为 Trigger ， Event 选择 On Request 。按照界面的提示为 Lambda 创建专用的 Role 。
提交后，我们就可以通过 Url 访问，发现 `/` 结尾的 URL 也会正常显示了。

# 之后的事

这个过程仍有以下问题：
- 对 Lambda 的认识仍有不足，今后需继续学习运用
- Lambda@Edge 还没有结合到 IaC 中
- 配置文件生成过程仍有改进空间

留下这些问题，今后再修改。
