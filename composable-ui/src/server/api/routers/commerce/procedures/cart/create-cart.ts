import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const createCart = protectedProcedure.mutation(async () => {
  return await commerce.createCart()
})
