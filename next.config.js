/** @type {import('next').NextConfig} */
const basePath = process.env.SITE_URL_BASE_PATH ? `/${process.env.SITE_URL_BASE_PATH}` : "";
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: `${basePath}`,
  basePath: `${basePath}`,
  experimental: {
    // we load metadata when build-time, which is very very slow.
    // and those metadata are immutable and could be cached.
    // however, caching is not available crossing different threads,
    // so we just use single thread to build,
    // and it's faster than using multiple threads (because of cache).
    cpus: 1,
  },
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
