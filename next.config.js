/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "i.creativecommons.org"
      }
    ]
  }
}

module.exports = nextConfig
