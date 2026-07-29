import type { NextConfig } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://orchid-jellyfish-551876.hostingersite.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://res.cloudinary.com/**"),
      new URL("/**", apiUrl),
    ],
  },
};

export default nextConfig;
