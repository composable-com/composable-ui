import { getPage } from '@composable/cms-generic'
import { PageSchema } from '@composable/types'
import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '../trpc'

export const cmsRouter = createTRPCRouter({
  getPage: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      try {
        const page = await getPage({ pageSlug: input.slug })
        return PageSchema.parse(page)
      } catch (err) {
        console.log(err)
        return null
      }
    }),
})
