import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { SitemapField } from '@composable/types'
import { createServerApp } from 'server/isr/server-app'

const SITEMAPS = {
  categories: 'categories.xml',
  products: 'products.xml',
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = `${context.query.slug}`

  if (!Object.values(SITEMAPS).includes(slug)) {
    return {
      notFound: true,
      props: {},
    }
  }

  let sitemapData: SitemapField[] | null = null
  const { ssg } = await createServerApp({ context })

  if (slug === SITEMAPS.categories) {
    sitemapData = await ssg.commerce.getCategorySitemap.fetch()
  }

  if (slug === SITEMAPS.products) {
    sitemapData = await ssg.commerce.getProductSitemap.fetch()
  }

  return getServerSideSitemap(context, sitemapData ?? [])
}

export default function Sitemap() {}
