const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const NO_INDEX_FOLLOW_PATHS = ['/cart', '/checkout', '/checkout/success']

// Security headers

const HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // 'Content-Security-Policy': ;
  // Be sure to set your Content-Security-Policy (CSP) based on your desired security practices.
  // Read more about CSP and the available directives on https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
  'Permissions-Policy':
    'camera=(self), microphone=(self), geolocation=(self), interest-cohort=(self)',
}

module.exports = () => {
  function checkEnv() {
    if (!process.env.NEXTAUTH_SECRET) {
      console.warn(
        'Required environment variable NEXTAUTH_SECRET is not defined. Please see https://docs.composable.com/docs/essentials/configuration for more information.'
      )
    }
  }

  checkEnv()

  return withBundleAnalyzer({
    reactStrictMode: true,
    transpilePackages: [
      '@composable/cms-generic',
      '@composable/commerce-generic',
      '@composable/stripe',
      '@composable/types',
      '@composable/ui',
    ],
    images: {
      domains: ['loremflickr.com'],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60 * 60 * 24 * 30,
    },
    i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
    },
    experimental: {
      esmExternals: 'loose',
    },
    swcMinify: true,
    async headers() {
      return [
        {
          source: '/:path*',
          headers: Object.entries(HEADERS).map(([key, value]) => ({
            key,
            value,
          })),
        },
        ...NO_INDEX_FOLLOW_PATHS.map((source) => ({
          source,
          headers: [
            {
              key: 'x-robots-tag',
              value: 'noindex, follow',
            },
          ],
        })),
      ]
    },
  })
}
