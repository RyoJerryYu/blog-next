/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ryojerryyu.github.io/blog-next',
  generateRobotsTxt: true, // (optional)
  outDir: "./out",
  // sitemapSize: 7000,
}