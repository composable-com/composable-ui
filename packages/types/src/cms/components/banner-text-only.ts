import { z } from 'zod'

export const BannerTextOnlySchema = z.object({
  __typename: z.literal('BannerTextOnly').optional(),
  centered: z.boolean().optional(),
  containerMarginBottom: z.string().nullish(),
  containerMarginTop: z.string().nullish(),
  containerSize: z.string().nullish(),
  content: z.string(),
  ctaAlphaHref: z.string().nullish(),
  ctaAlphaLabel: z.string(),
  eyebrow: z.string().nullish(),
  id: z.string(),
  minHeight: z.string().nullish(),
  title: z.string(),
})

export type BannerTextOnlyProps = z.infer<typeof BannerTextOnlySchema>
