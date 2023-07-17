import { createTRPCRouter, protectedProcedure } from '../trpc'
import { z } from 'zod'
import { stripeProvider } from '@composable/stripe'
import { StripeSetupIntentParams } from '@composable/types'
import { commerce } from 'server/data-source'
import { APP_CONFIG } from '../../../utils/constants'
import { Session } from 'next-auth'
import { TRPCError } from '@trpc/server'

const validateUserSession = ({
  session,
  metadata,
}: {
  session?: Session | null
  metadata?: {
    loggedIn: boolean
    userId?: string
    userEmail?: string
    sub?: string
  }
}) => {
  return session && metadata && metadata.userId === session?.id
}

export const stripeRouter = createTRPCRouter({
  createSetupIntent: protectedProcedure
    .input(
      z.object({
        usage: z.string().regex(/on_session|off_session/),
        email: z.string().email().optional(),
        customer: z.string().optional(),
        payment_method_types: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const session = ctx?.session
      return await stripeProvider.createSetupIntent({
        ...input,
        metadata: {
          loggedIn: session?.loggedIn ?? false,
          userId: session?.id,
          userEmail: session?.user?.email ?? '',
          sub: session?.sub,
        },
        usage: input.usage as StripeSetupIntentParams['usage'],
      })
    }),
  createPaymentIntent: protectedProcedure
    .input(
      z.object({
        cartId: z.string(),
        paymentMethodId: z.string().optional(),
        customerId: z.string().optional(),
        redirectUrl: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const session = ctx?.session
      const cart = await commerce.getCart({ cartId: input.cartId })
      return await stripeProvider.createPaymentIntent({
        amount: parseInt(
          (parseFloat(cart?.summary.totalPrice ?? '0') * 100).toString()
        ),
        currency: APP_CONFIG.CURRENCY_CODE,
        customer: input.customerId,
        payment_method: input.paymentMethodId,
        return_url: input.redirectUrl,
        confirm: true,
        metadata: {
          loggedIn: session?.loggedIn ?? false,
          userId: session?.id,
          userEmail: session?.user?.email ?? '',
          sub: session?.sub,
        },
      })
    }),
  getPaymentIntent: protectedProcedure
    .input(
      z.object({
        paymentIntentId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!input.paymentIntentId) return null

      const paymentIntent = await stripeProvider.getPaymentIntent({
        paymentIntentId: input.paymentIntentId,
      })

      if (
        !validateUserSession({
          session: ctx?.session,
          metadata: paymentIntent.metadata,
        })
      ) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const card =
        paymentIntent.charges?.data[0]?.payment_method_details?.card ?? null
      return { paymentIntent, card }
    }),
  getPaymentMethod: protectedProcedure
    .input(
      z.object({
        paymentMethodId: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (!input.paymentMethodId) return null

      const paymentMethod = await stripeProvider.getPaymentMethod({
        id: input.paymentMethodId,
      })
      // Only return necessary data
      const { brand, last4, exp_month, exp_year } = paymentMethod.card ?? {}
      return { brand, last4, exp_month, exp_year }
    }),
})
