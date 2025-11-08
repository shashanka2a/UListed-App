import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Exclude src/pages from Next.js routing detection
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;

