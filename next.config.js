/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: `/blog-next`,
  basePath: `/blog-next`,
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
