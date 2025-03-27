import type { NextConfig } from "next";


const nextConfig:NextConfig = {
    webpack(config) {
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/ // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
                use: [{ loader: "@svgr/webpack", options: { icon: true } }],
            }
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
};


const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });

//tryin my shit here 
module.exports =withBundleAnalyzer( {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.optimization.splitChunks = {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: "all",
              name: "framework",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
                );
              },
              name(module) {
                const hash = require("crypto")
                  .createHash("sha1")
                  .update(module.libIdent({ context: __dirname }))
                  .digest("hex")
                  .substring(0, 8);
                return `lib.${hash}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        };
      }
      return config;
    },
  });

export default nextConfig;