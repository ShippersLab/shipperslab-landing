import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  experimental: {
    optimizePackageImports: ["@hugeicons/core-free-icons"],
  },
};

export default nextConfig;
