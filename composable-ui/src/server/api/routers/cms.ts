import { createTRPCRouter, publicProcedure } from '../trpc'
import { getPage } from '@composable/cms-generic'
import { PageProps } from '@composable/types'
import { z } from 'zod'

export const cmsRouter = createTRPCRouter({
  getPage: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getPage({ pageSlug: input.slug }) as PageProps
    }),
})
