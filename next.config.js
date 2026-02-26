const stylexPlugin = require('@stylexjs/nextjs-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api', 'import'],
    quietDeps: true,
    logger: {
      warn: function() {
        // Suppress all Sass warnings
      },
      debug: function() {}
    }
  },
  experimental: {
    scrollRestoration: false,
  },
  turbopack: {},
  // Rewrite root to /google (avoids redirect issues with Vercel auth)
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/google/',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Filter out Sass deprecation warnings from stats
    config.infrastructureLogging = {
      level: 'error',
    };

    // Suppress warnings
    config.ignoreWarnings = [
      /Deprecation Warning/,
      /sass/,
      /Skipping auto-scroll/,
    ];

    return config;
  },
}

module.exports = stylexPlugin({
  rootDir: __dirname,
  useCSSLayers: true,
})(nextConfig);
