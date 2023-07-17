import {
  getOrCreateCustomer,
  getStripeClient,
  stripePaymentIntentCreateService,
  stripePaymentIntentRetrieveService,
  stripePaymentMethodRetrieveService,
  stripeSetupIntentCreateService,
} from './service'
import {
  StripePaymentIntentParams,
  StripePaymentMethodParams,
  StripeSetupIntentParams,
} from '@composable/types'

const client = getStripeClient(process.env.STRIPE_SECRET_KEY ?? '')

export const stripeProvider = {
  createSetupIntent: async ({
    email,
    ...rest
  }: StripeSetupIntentParams & { email?: string }) => {
    if (!process.env.STRIPE_SECRET_KEY) {
      return null
    }
    const stripeCustomer = await getOrCreateCustomer({
      client,
      params: { email: email },
    })
    return stripeSetupIntentCreateService({
      client,
      params: {
        ...rest,
        customer: stripeCustomer.id,
      },
    })
  },
  createPaymentIntent: async (params: StripePaymentIntentParams) => {
    return stripePaymentIntentCreateService({
      client,
      params,
    })
  },
  getPaymentIntent: async (params: { paymentIntentId: string }) => {
    return stripePaymentIntentRetrieveService({
      client,
      params,
    })
  },
  getPaymentMethod: async (params: StripePaymentMethodParams) => {
    return stripePaymentMethodRetrieveService({
      client,
      params,
    })
  },
}
