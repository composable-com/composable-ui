import { CommerceService, SitemapField } from '@composable/types'
import categories from '../../data/categories.json'

export const getCategorySitemap: CommerceService['getCategorySitemap'] =
  async ({ siteUrl }) => {
    const sitemap = categories.map((category) => {
      const entry: SitemapField = {
        loc: `${siteUrl}/category/${category.slug}`,
        lastmod: new Date().toISOString(),
        priority: 0.5,
        changefreq: 'daily',
      }
      return entry
    })

    return sitemap
  }
