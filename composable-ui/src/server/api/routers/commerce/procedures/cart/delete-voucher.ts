import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const deleteVoucher = protectedProcedure
  .input(
    z.object({
      cartId: z.string(),
      code: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    return await commerce.deleteVoucher({ ...input })
  })
