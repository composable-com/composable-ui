import { protectedProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const getShippingMethods = protectedProcedure.query(
  async () => await commerce.getShippingMethods()
)
