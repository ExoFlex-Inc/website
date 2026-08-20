import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Modern formats Next should output
    formats: ["image/avif", "image/webp"],

    // Tailored sizes (px) that match your Tailwind break-points
    deviceSizes: [320, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],

    // Optimized images stay cached for ~1 month
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
