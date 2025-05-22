import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* existing config options */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },


  // Add these two for static export:
  output: 'export',
  distDir: 'out',
};

export default nextConfig;
