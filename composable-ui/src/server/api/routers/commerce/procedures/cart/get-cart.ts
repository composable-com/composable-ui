import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const getCart = protectedProcedure
  .input(z.object({ cartId: z.string() }))
  .query(async ({ input }) => {
    return await commerce.getCart({ ...input })
  })
