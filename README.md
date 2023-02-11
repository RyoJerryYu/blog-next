# Ryo's Blog

Here is the source code of my blog.

- [Release Version](https://blog.ryo-okami.xyz/)
- [Preview Version](https://test.ryo-okami.xyz/)
- [GitHub Pages Version](https://ryojerryyu.github.io/blog-next/)


# Features

## Fully Statics! 

It can be deployed to GitHub Pages! 

It build on Next.js Framework, and using it's Static Export feature. Thanks to this, the website is very fast and SEO friendly.

## Support MDX! 

Besides, it support GFM, KaTeX, Mermaid, and some self-defined feature. 

This feature is based on [remark](https://github.com/remarkjs/remark) and [rehype](https://github.com/rehypejs/rehype) ecosystems ([unified](https://github.com/unifiedjs/unified) plugins). You can find the plugin I have built in `src/plugins`. (Sorry but I do not intent to publish them to npm.) 

## Fully Automated Deployment!

There is a set of GitHub Actions defined in `.github/workflows`, which will automatically build and deploy the blog to GitHub Pages and AWS S3. I could preview it by opening a PR, and deploy it by merging into `master` branch.

## Non-trailing slash url style, on AWS S3 + CloudFront!

Yes, it's worth mentioning. You should have noticed that it's a bad idea to use non-trailing slash url style on S3, because it will not return `some/page.html` when you visit `some/page`. But it could be done by using lambda@edge.

If you are interested in this, you can find the code in another repo: [RyoJerryYu/aws-blog-infra](https://github.com/RyoJerryYu/aws-blog-infra). I use [Pulumi](https://www.pulumi.com/) to define the infrastructure as code. And of cause, the infrastructure deployment is also fully automated by GitHub Actions. 

(Pulumi is a great tool!)

