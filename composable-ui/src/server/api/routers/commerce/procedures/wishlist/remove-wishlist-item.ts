import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const removeWishlistItem = protectedProcedure
  .input(
    z.object({
      userId: z.string(),
      itemId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    return await commerce.removeWishlistItem({ ...input })
  })
