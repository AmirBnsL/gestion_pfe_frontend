import type { NextConfig } from "next"
import type { Configuration, RuleSetRule } from "webpack"
import { createHash } from "crypto"
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  webpack: (config: Configuration, { isServer }: { isServer: boolean }) => {
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module?.rules?.find((rule) => {
      // Ensure 'rule' is an object with a test property that is a RegExp
      if (
        typeof rule === "object" &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg")
      ) {
        return true
      }
      return false
    }) as RuleSetRule | undefined

    if (fileLoaderRule) {
      // Push new rules for handling SVGs
      config.module?.rules?.push(
        // Reapply the existing rule, but only for svg imports ending in ?url
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/, // *.svg?url
        },
        // Convert all other *.svg imports to React components
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: {
            not: [
              // Safely spread any existing 'not' array if it's there
              ...(Array.isArray((fileLoaderRule.resourceQuery as any)?.not)
                ? (fileLoaderRule.resourceQuery as any).not
                : []),
              /url/,
            ],
          },
          use: [{ loader: "@svgr/webpack", options: { icon: true } }],
        }
      )

      // Exclude SVGs from the original file loader rule
      if (Array.isArray(fileLoaderRule.exclude)) {
        fileLoaderRule.exclude.push(/\\.svg$/i)
      } else {
        fileLoaderRule.exclude = [/\\.svg$/i]
      }
    }

    // Fine-grained splitting for client bundles
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
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
              test(module: any) {
                return (
                  module.size() > 160000 &&
                  /node_modules[/\\]/.test(module.identifier())
                )
              },
              name(module: any) {
                const hash = createHash("sha1")
                  .update(module.libIdent({ context: __dirname }))
                  .digest("hex")
                  .substring(0, 8)
                return `lib.${hash}`
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    return config
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
}

module.exports = withBundleAnalyzer(nextConfig)
export default nextConfig
