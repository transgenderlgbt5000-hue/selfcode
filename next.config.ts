import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export (replacement for deprecated `next export`)
  output: "export",
  // Use trailingSlash to generate directory-style pages which work well with GitHub Pages
  trailingSlash: true,
  // Optional base path for GitHub Pages repo sites. Set NEXT_BASE_PATH=/your-repo
  basePath: process.env.NEXT_BASE_PATH || "",
  assetPrefix: process.env.NEXT_BASE_PATH || "",
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
