import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const addWishlistItem = protectedProcedure
  .input(
    z.object({
      wishlistId: z.string(),
      userId: z.string(),
      productId: z.string(),
      name: z.string(),
      brand: z.string(),
      sku: z.string(),
      type: z.string(),
      price: z.number(),
      image: z.object({
        url: z.string(),
        alt: z.string().optional(),
      }),
      slug: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    return await commerce.addWishlistItem({ ...input })
  })
