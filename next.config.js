const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@aomdev/ui": {
      transform: "@aomdev/ui/src/{{ kebabCase member }}",
      skipDefaultConversion: true
    }
  }
};

module.exports = withContentlayer(nextConfig);
