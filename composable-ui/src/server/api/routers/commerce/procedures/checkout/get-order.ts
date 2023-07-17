import { z } from 'zod'
import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const getOrder = protectedProcedure
  .input(z.object({ orderId: z.string() }))
  .query(async ({ input }) => {
    return await commerce.getOrder({ ...input })
  })
