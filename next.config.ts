import type { NextConfig } from "next";

// Static export works on Vercel, Netlify, cPanel or any plain web host.
// Remove `output` if you later need server features (API routes, ISR).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
