import { z } from 'zod'
import { ImageSchema } from './fields'

export const ArticleCardSchema = z.object({
  __typename: z.literal('ArticleCard'),
  containerMarginBottom: z.string().optional(),
  containerMarginTop: z.string().optional(),
  containerSize: z.string().optional(),
  content: z.string(),
  eyebrow: z.string().optional(),
  href: z.string(),
  id: z.string(),
  image: ImageSchema,
  textAlign: z.string(),
  title: z.string(),
})

export type ArticleCardProps = z.infer<typeof ArticleCardSchema>
