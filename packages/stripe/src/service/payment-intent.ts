import qs from 'qs'
import { StripeServiceProps } from './types'
import {
  StripePaymentIntent,
  StripePaymentIntentParams,
} from '@composable/types'

export const stripePaymentIntentRetrieveService = async ({
  client,
  params,
}: StripeServiceProps<{ paymentIntentId: string }>) => {
  const response = await client.get<StripePaymentIntent>(
    `/payment_intents/${params.paymentIntentId}`
  )
  return response.data
}

export const stripePaymentIntentCreateService = async ({
  client,
  params,
}: StripeServiceProps<StripePaymentIntentParams>) => {
  const response = await client.post<StripePaymentIntent>(
    '/payment_intents',
    qs.stringify(params)
  )
  return response.data
}
