import { publicProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'
import { getSitemapUrl } from '../../../../../../../get-sitemap-url'

export const getProductSitemap = publicProcedure.query(async () => {
  return await commerce.getProductSitemap({ siteUrl: getSitemapUrl() })
})
