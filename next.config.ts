import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Internationalization configuration
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bn',
        permanent: false,
        has: [
          {
            type: 'header',
            key: 'accept-language',
            value: '(.*bn.*)',
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
