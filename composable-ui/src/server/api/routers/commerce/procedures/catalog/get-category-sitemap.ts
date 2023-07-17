import { publicProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'
import { getSitemapUrl } from '../../../../../../../get-sitemap-url'

export const getCategorySitemap = publicProcedure.query(async () => {
  return await commerce.getCategorySitemap({ siteUrl: getSitemapUrl() })
})
