/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_VERSION: process.env.VERSION,
  },
};

export default nextConfig;
