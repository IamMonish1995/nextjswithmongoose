/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    reactRoot: true,
    runtime: "nodejs",
    serverComponents: true,
    concurrentFeatures: true,
  },
};

module.exports = nextConfig;
