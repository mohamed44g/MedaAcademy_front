/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.med-aplus.com",
        pathname: "/Uploads/*",
      },

      {
        protocol: "https",
        hostname: "med-aplus.com",
        pathname: "/Uploads/*",
      },
    ],
  },
};

export default nextConfig;
