import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const createWishlist = protectedProcedure
  .input(
    z.object({
      userId: z.string(),
      name: z.string(),
      items: z.array(
        z.object({
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
      ),
    })
  )
  .mutation(async ({ input }) => {
    console.log('martin 33 input', input)
    const result = await commerce.createWishlist({ ...input })
    console.log('martin 35 result', result)
    return result
  })
