import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = 
{
  images: 
  {
      remotePatterns:[
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dynamic-events-api.onrender.com"
      },
    ],
  },
};

export default nextConfig;
