/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['@prisma/client'], // ✅ updated key name
  webpack: (config) => {
    config.resolve.alias['.prisma/client'] = require.resolve('@prisma/client')
    return config
  },
}

module.exports = nextConfig
