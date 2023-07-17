import { publicProcedure } from 'server/api/trpc'
import { commerce } from 'server/data-source'

export const getProductStaticPaths = publicProcedure.query(async () => {
  return (await commerce.getProductStaticPaths?.()) || []
})
