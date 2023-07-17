import { createTRPCRouter, publicProcedure } from '../trpc'
import { intlConfig } from '../../intl'

export const configRouter = createTRPCRouter({
  intl: publicProcedure.query(async () => {
    return intlConfig
  }),
})
