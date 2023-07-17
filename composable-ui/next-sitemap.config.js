const { getSitemapUrl } = require('./get-sitemap-url')

const sitemapServerPaths = ['sitemap/categories.xml', 'sitemap/products.xml']

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `${getSitemapUrl()}/`,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    ...sitemapServerPaths.map((path) => `/${path}`),
    '/category/*',
    '/checkout*',
    '/product/*',
    '/404',
    '/cart',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api', '/checkout', '/404', '/cart'],
      },
    ],
    additionalSitemaps: [
      ...sitemapServerPaths.map((path) => `${getSitemapUrl()}/${path}`),
    ],
  },
  // All the options: https://github.com/iamvishnusankar/next-sitemap#configuration-options
}
