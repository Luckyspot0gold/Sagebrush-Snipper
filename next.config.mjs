/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      // Subdomain routing
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'boxing.cryptoclashers.games',
          },
        ],
        destination: '/boxing/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'racing.cryptoclashers.games',
          },
        ],
        destination: '/racing/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'saloon.stoneyard.cash',
          },
        ],
        destination: '/saloon/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'wyoverse.cryptoclashers.games',
          },
        ],
        destination: '/wyoverse/:path*',
      },
    ]
  },
  images: {
    domains: ['placeholder.svg', 'blob.v0.dev'],
    unoptimized: true,
  },
}

export default nextConfig
