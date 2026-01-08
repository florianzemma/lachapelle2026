import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Recommend to keep this as false in production
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
    ],
  },
};

export default nextConfig;
