/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    // imageSizes: [32, 32, 48, 64, 96, 128, 256, 384],
    domains: ["lh3.googleusercontent.com", "files.stripe.com"],
  },
};

module.exports = nextConfig;
