/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React strict mode to prevent double rendering in development
  reactStrictMode: false,
  
  // Enable experimental features
  experimental: {
    // Better cache for faster builds
    turbotrace: true,
  },
  
  // Configure images
  images: {
    domains: ['localhost'],
  },
  
  // Disable TypeScript and ESLint checks for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
