import { z } from 'zod'
import {
  BannerFullSchema,
  BannerSplitSchema,
  BannerTextOnlySchema,
  CommerceConnectorSchema,
  GridSchema,
} from './components'

export const PageItemSchema = z.union([
  BannerFullSchema,
  BannerSplitSchema,
  BannerTextOnlySchema,
  CommerceConnectorSchema,
  GridSchema,
])

export type PageItem = z.infer<typeof PageItemSchema>

export const PageSchema = z.object({
  __typename: z.string(),
  id: z.string(),
  items: z.array(PageItemSchema),
  metaDescription: z.string(),
  metaKeywords: z.array(z.string()),
  metaTitle: z.string(),
  slug: z.string(),
})

export type PageProps = z.infer<typeof PageSchema>
