import { z } from 'zod'

const PriceSchema = z.object({
  current: z.number(),
  currentFormatted: z.string(),
  regular: z.number().optional(),
  regularFormatted: z.string().optional(),
})

export type PriceProps = z.infer<typeof PriceSchema>

const CommerceProductsSchema = z.object({
  brand: z.string().nullish(),
  id: z.string(),
  img: z
    .object({
      url: z.string().optional(),
      alt: z.string().optional(),
    })
    .optional(),
  name: z.string(),
  price: PriceSchema.optional(),
  slug: z.string(),
})

export type CommerceProduct = z.infer<typeof CommerceProductsSchema>

export const CommerceConnectorSchema = z.object({
  __typename: z.literal('CommerceConnector'),
  containerMarginBottom: z.string().optional(),
  containerMarginTop: z.string().optional(),
  containerSize: z.string().optional(),
  ctaHref: z.string().nullish(),
  ctaLabel: z.string().nullish(),
  ctaHeight: z.string().nullish(),
  ctaMaxWidth: z.string().nullish(),
  ctaMinWidth: z.string().nullish(),
  id: z.string(),
  productListType: z.union([z.literal('id'), z.literal('sku')]).optional(),
  products: z.array(CommerceProductsSchema),
  title: z.string().nullish(),
})

export type CommerceConnectorProps = z.infer<typeof CommerceConnectorSchema>
