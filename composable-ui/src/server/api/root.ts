import { createTRPCRouter } from './trpc'
import { commerceRouter } from './routers/commerce/commerce-router'
import { cmsRouter } from './routers/cms'
import { configRouter } from './routers/config'
import { stripeRouter } from './routers/stripe'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  cms: cmsRouter,
  commerce: commerceRouter,
  config: configRouter,
  stripe: stripeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
