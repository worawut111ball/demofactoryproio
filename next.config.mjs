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
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  webpack: (config) => {
    config.resolve.alias['.prisma/client'] = require.resolve('@prisma/client')
    return config
  },
}

export default nextConfig
