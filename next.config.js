/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'img.clerk.com'
      },
      {
        hostname: 'utfs.io'
      }
    ]
  }
}

module.exports = nextConfig
