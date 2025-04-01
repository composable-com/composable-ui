import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const deleteWishlist = protectedProcedure
  .input(z.object({ wishlistId: z.string() }))
  .mutation(async ({ input }) => {
    return await commerce.deleteWishlist({ ...input })
  })
