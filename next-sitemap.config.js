/** @type {import('next-sitemap').IConfig} */
const siteOrigin = process.env.SITE_URL_ORIGIN || 'https://blog.ryojerryyu.xyz';
const basePath = process.env.SITE_URL_BASE_PATH || "";
module.exports = {
  siteUrl: `${siteOrigin}${basePath}`,
  generateRobotsTxt: true, // (optional)
  outDir: "./out",
  // sitemapSize: 7000,
}