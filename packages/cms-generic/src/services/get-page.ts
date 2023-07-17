import pages from '../data/pages.json'

export const getPage = (params: { pageSlug: string }) => {
  if (!params.pageSlug) {
    return null
  }

  return pages.find((page) => page.slug === params.pageSlug)
}
