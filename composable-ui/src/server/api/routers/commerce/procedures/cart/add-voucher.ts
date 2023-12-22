import { protectedProcedure } from '../../../../trpc'
import { z } from 'zod'
import { commerce } from 'server/data-source'

export const addVoucher = protectedProcedure
  .input(
    z.object({
      cartId: z.string(),
      code: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    return await commerce.addVoucher({ ...input })
  })
