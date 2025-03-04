import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ["github.com"], // 允許 github.com 作為圖片來源
  },
};

export default nextConfig;
