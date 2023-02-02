/** @type {import('next').NextConfig} */
const basePath = process.env.SITE_URL_BASE_PATH ? `/${process.env.SITE_URL_BASE_PATH}` : "";
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: `${basePath}`,
  basePath: `${basePath}`,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "i.creativecommons.org"
      }
    ]
  }
}

module.exports = nextConfig
