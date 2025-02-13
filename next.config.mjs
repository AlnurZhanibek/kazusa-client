/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hyderabadangels.in",
      },
      {
        protocol: "https",
        hostname: "kazusa-bucket.fra1.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

export default nextConfig;
