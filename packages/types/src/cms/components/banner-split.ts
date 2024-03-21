import { z } from 'zod'
import { ImageSchema } from './fields'

export const BannerSplitSchema = z.object({
  __typename: z.literal('BannerSplit').optional(),
  containerMarginBottom: z.string().nullish(),
  containerMarginTop: z.string().nullish(),
  containerSize: z.string().nullish(),
  content: z.string(),
  ctaAlphaHref: z.string().nullish(),
  ctaAlphaLabel: z.string(),
  eyebrow: z.string().nullish(),
  id: z.string(),
  imageDesktop: ImageSchema.nullish(),
  imageMobile: ImageSchema.nullish(),
  inverted: z.boolean(),
  isFullScreen: z.boolean(),
  isLazy: z.boolean(),
  title: z.string(),
})

export type BannerSplitProps = z.infer<typeof BannerSplitSchema>
