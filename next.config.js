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
  },
  env: {
    UPLOADTHING_SECRET: process.env.UPLOADTHING_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY
  }
}

module.exports = nextConfig
