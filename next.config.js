/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH || undefined;
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: false,
  assetPrefix: basePath,
  basePath: basePath,
  transpilePackages: [
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "antd",
    "@ant-design/icons-svg",
  ],
  // experimental: {
  //   // we load metadata when build-time, which is very very slow.
  //   // and those metadata are immutable and could be cached.
  //   // however, caching is not available crossing different threads,
  //   // so we just use single thread to build,
  //   // and it's faster than using multiple threads (because of cache).
  //   cpus: 1,
  //   workerThreads: false,
  // },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.creativecommons.org",
      },
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.TEST_ENV === "analyze",
});

module.exports = withBundleAnalyzer(nextConfig);
