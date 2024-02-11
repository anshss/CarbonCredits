/** @type {import('next').NextConfig} */
const nextConfig = {}


module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Replace 'fs' module with an empty module on the client side
        config.resolve.fallback = { fs: false };
      }
      return config;
    },
  };
  
