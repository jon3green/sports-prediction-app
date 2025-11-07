const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['a.espncdn.com', 'upload.wikimedia.org'],
  },
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
  },
}

const sentryWebpackPluginOptions = {
  org: "linepointer",
  project: "linepointer-nextjs",
  silent: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)

