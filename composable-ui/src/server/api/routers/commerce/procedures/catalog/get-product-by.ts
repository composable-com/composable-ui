import { z } from 'zod'
import { publicProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const getProductBy = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ input }) => {
    return await commerce.getProductBy({ slug: input.slug })
  })
