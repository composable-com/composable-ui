import { z } from 'zod'
import { ArticleCardSchema } from './article-card'
import { CoverCardSchema } from './cover-card'
import { TextCardSchema } from './text-card'

export const GridItemSchema = z.union([
  ArticleCardSchema,
  CoverCardSchema,
  TextCardSchema,
])

export type GridItem = z.infer<typeof GridItemSchema>

export const GridSchema = z.object({
  __typename: z.literal('Grid'),
  columns: z.number(),
  containerMarginBottom: z.string().or(z.number()).nullable().optional(),
  containerMarginTop: z.string().or(z.number()).nullable().optional(),
  containerSize: z.string().nullable().optional(),
  gridGap: z.number().optional(),
  id: z.string(),
  items: z.array(GridItemSchema),
})

export type GridProps = z.infer<typeof GridSchema>
