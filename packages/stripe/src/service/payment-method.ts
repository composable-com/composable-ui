import { StripeServiceProps } from './types'
import {
  StripePaymentMethod,
  StripePaymentMethodParams,
} from '@composable/types'

export const stripePaymentMethodRetrieveService = async ({
  client,
  params,
}: StripeServiceProps<StripePaymentMethodParams>) => {
  const response = await client.get<StripePaymentMethod>(
    `/payment_methods/${params.id}`
  )
  return response.data
}
