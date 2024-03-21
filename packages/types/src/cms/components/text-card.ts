import { z } from 'zod'
import { ImageSchema } from './fields'

export const TextCardSchema = z.object({
  __typename: z.literal('TextCard'),
  content: z.string(),
  ctaHref: z.string().nullish(),
  ctaLabel: z.string().nullish(),
  id: z.string(),
  image: ImageSchema,
  textAlign: z.string(),
  theme: z.string(),
  title: z.string(),
})

export type TextCardProps = z.infer<typeof TextCardSchema>
