/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Allow loading images from external sources if needed
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
