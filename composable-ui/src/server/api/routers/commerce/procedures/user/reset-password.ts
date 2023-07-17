import { z } from 'zod'
import { publicProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const resetPassword = publicProcedure
  .input(
    z.object({
      email: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    return await commerce.resetPassword({ ...input })
  })
