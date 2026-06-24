import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/aegisfi" : "", // Use basePath only in production (GitHub Pages)
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
