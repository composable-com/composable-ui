import { z } from 'zod'
import { ImageSchema } from './fields'

export const CoverCardSchema = z.object({
  __typename: z.literal('CoverCard'),
  containerMarginBottom: z.string().nullish(),
  containerMarginTop: z.string().nullish(),
  containerSize: z.string().nullish(),
  content: z.string(),
  eyebrow: z.string().nullish(),
  href: z.string(),
  id: z.string(),
  image: ImageSchema,
  textAlign: z.string(),
  theme: z.string(),
  title: z.string(),
})

export type CoverCardProps = z.infer<typeof CoverCardSchema>
