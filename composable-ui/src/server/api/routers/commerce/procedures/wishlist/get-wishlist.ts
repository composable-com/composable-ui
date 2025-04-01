import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const getWishlist = protectedProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    const ret = await commerce.getWishlist({ ...input })
    return ret
  })
