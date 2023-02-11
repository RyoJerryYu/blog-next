const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://blog.ryojerryyu.xyz';
const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH || "";
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `${siteOrigin}${basePath}`,
  generateRobotsTxt: true, // (optional)
  outDir: "./out",
  // sitemapSize: 7000,
  generateIndexSitemap: false,
}