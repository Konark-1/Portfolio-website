import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Optimize for performance
  compress: true,
  
  // Enable production optimizations
  productionBrowserSourceMaps: false, // Disable source maps in production for smaller bundles
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Reduce JavaScript bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Add empty turbopack config to allow webpack config
  turbopack: {},
  
  // Webpack optimizations (for production builds)
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Enable production optimizations
      config.optimization = {
        ...config.optimization,
        // Ensure minification is enabled
        minimize: true,
        minimizer: config.optimization?.minimizer || [],
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate framer-motion into its own chunk
            framerMotion: {
              name: 'framer-motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              priority: 30,
            },
            // Separate lucide-react
            lucideReact: {
              name: 'lucide-react',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              chunks: 'all',
              priority: 25,
            },
            // Framework chunk
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              chunks: 'all',
              priority: 40,
              reuseExistingChunk: true,
            },
            // Other vendor libraries
            lib: {
              name: 'lib',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
