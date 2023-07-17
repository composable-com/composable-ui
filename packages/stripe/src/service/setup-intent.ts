import qs from 'qs'
import { StripeSetupIntent, StripeSetupIntentParams } from '@composable/types'
import { StripeServiceProps } from './types'

export const stripeSetupIntentCreateService = async ({
  client,
  params,
}: StripeServiceProps<StripeSetupIntentParams>) => {
  const response = await client.post<StripeSetupIntent>(
    '/setup_intents',
    qs.stringify(params)
  )
  return response.data
}
