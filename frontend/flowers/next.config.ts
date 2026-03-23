import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allow all HTTPS domains
      },
    ],
  },
};

export default nextConfig;
