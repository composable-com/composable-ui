import { CommerceService, SitemapField } from '@composable/types'
import products from '../../data/products.json'

export const getProductSitemap: CommerceService['getProductSitemap'] = async ({
  siteUrl,
}) => {
  const sitemap = products.map((product) => {
    const entry: SitemapField = {
      loc: `${siteUrl}/product/${product.slug}`,
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'daily',
    }
    return entry
  })

  return sitemap
}
