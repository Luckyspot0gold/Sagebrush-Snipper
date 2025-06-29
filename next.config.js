/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Enable static export for deployment
  output: 'export',
  trailingSlash: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
    domains: ['images.pexels.com', 'cdn.jsdelivr.net']
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: 'wyoverse-production',
    DEPLOYMENT_ENV: 'production'
  },
  
  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add custom webpack rules
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
        },
      },
    });

    // Optimize for production
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'X-Wyoming-Protocol',
            value: '7.0'
          }
        ]
      }
    ];
  },
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/sagebrush',
        destination: '/apps/sagebrush-sniper',
        permanent: true
      },
      {
        source: '/clashers',
        destination: '/apps/crypto-clashers',
        permanent: true
      },
      {
        source: '/dee',
        destination: '/apps/dr-dee-assistant',
        permanent: true
      }
    ];
  },
  
  // Experimental features
  experimental: {
    appDir: false, // Keep using pages directory
    optimizeCss: true,
    scrollRestoration: true
  }
};

module.exports = nextConfig;