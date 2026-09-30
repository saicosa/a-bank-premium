import type { NextConfig } from "next";

const basePath = process.env.NEXT_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.tildacdn.com",
      },
      {
        protocol: "https",
        hostname: "thb.tildacdn.com",
      },
    ],
  },
};

export default nextConfig;
