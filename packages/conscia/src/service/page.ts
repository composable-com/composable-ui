import { PageProps } from '@composable/types'
import { ConsciaPageTemplateComponents } from '../types'
import { getTemplateData } from './templates'
import { transformPage } from '../utils'

export const getPage = async ({
  pageSlug,
}: {
  pageSlug: string
}): Promise<PageProps | null> => {
  if (!pageSlug) {
    return null
  }
  const consciaPage = await getTemplateData<ConsciaPageTemplateComponents>({
    templateCode: pageSlug,
  })
  return consciaPage ? transformPage({ consciaPage, pageSlug }) : null
}
