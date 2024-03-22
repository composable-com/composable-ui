import { z } from 'zod'
import { ImageSchema } from './fields'

export const BannerFullSchema = z.object({
  __typename: z.literal('BannerFull').optional(),
  containerMarginBottom: z.string().nullish(),
  containerMarginTop: z.string().nullish(),
  containerSize: z.string().nullish(),
  content: z.string(),
  ctaAlphaHref: z.string().nullish(),
  ctaAlphaLabel: z.string(),
  ctaBetaHref: z.string().nullish(),
  ctaBetaLabel: z.string().nullish(),
  eyebrow: z.string().nullish(),
  id: z.string(),
  imageDesktop: ImageSchema.nullish(),
  imageMobile: ImageSchema.nullish(),
  linkHref1: z.string().nullish(),
  linkHref2: z.string().nullish(),
  linkHref3: z.string().nullish(),
  linkHref4: z.string().nullish(),
  linkHref5: z.string().nullish(),
  linkHref6: z.string().nullish(),
  linkLabel1: z.string().nullish(),
  linkLabel2: z.string().nullish(),
  linkLabel3: z.string().nullish(),
  linkLabel4: z.string().nullish(),
  linkLabel5: z.string().nullish(),
  linkLabel6: z.string().nullish(),
  overlayBackground: z.string().nullish(),
  textPosition: z.string(),
  theme: z.string(),
  title: z.string(),
})

export type BannerFullProps = z.infer<typeof BannerFullSchema>
