/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
  async rewrites() {
    return [
      // Cloudflare subdomain routing
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'boxing.cryptoclashers.games',
          },
        ],
        destination: '/boxing-arena/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'racing.cryptoclashers.games',
          },
        ],
        destination: '/racing-circuit/:path*',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'saloon.cryptoclashers.games',
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
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'api.cryptoclashers.games',
          },
        ],
        destination: '/api/:path*',
      },
    ]
  },
  images: {
    domains: ['cryptoclashers.games', 'cdn.cryptoclashers.games', 'placeholder.svg', 'blob.v0.dev'],
    unoptimized: false,
    loader: 'custom',
    loaderFile: './lib/cloudflare-image-loader.ts',
  },
  experimental: {
    runtime: 'edge',
  },
}

export default nextConfig
