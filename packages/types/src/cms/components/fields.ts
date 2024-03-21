import { z } from 'zod'

export const ImageSchema = z.object({
  description: z.string(),
  title: z.string(),
  url: z.string(),
  minHeight: z.string().optional(),
})

export type ImageProps = z.infer<typeof ImageSchema>
