import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/aegisfi", // Useful if deploying to GitHub pages (repo name)
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
