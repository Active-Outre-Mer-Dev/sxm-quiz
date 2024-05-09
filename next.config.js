const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@aomdev/ui": {
      transform: "@aomdev/ui/src/{{ kebabCase member }}",
      skipDefaultConversion: true
    }
  },
  images: {
    remotePatterns: [
      {
        hostname: "daiuieddiuwtzqtsxaoh.supabase.co"
      }
    ]
  }
};

module.exports = withContentlayer(nextConfig);
