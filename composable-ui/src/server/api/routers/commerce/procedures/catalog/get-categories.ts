import { publicProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const getCategories = publicProcedure.query(async () => {
  return await commerce.getCategories()
})
