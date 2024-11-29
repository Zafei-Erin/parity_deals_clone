import type { NextConfig } from "next";

// do not cache dynamic pages
const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
    },
  },
};

export default nextConfig;
