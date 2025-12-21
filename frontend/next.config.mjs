/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // Required for the Dockerfile above
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
