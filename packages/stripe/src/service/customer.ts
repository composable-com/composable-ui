import qs from 'qs'
import { StripeServiceProps } from './types'
import {
  StripeCustomer,
  StripeCustomerParams,
  StripeCustomerSearchResponse,
} from '@composable/types'

export const stripeCustomerFindByEmailService = async ({
  client,
  params,
}: StripeServiceProps<StripeCustomerParams>) => {
  const response = await client.get<StripeCustomerSearchResponse>(
    `/customers/search?query=email:"${params.email}"`
  )
  return response.data.data?.[0] ?? null
}

export const stripeCustomerCreateService = async ({
  client,
  params,
}: StripeServiceProps<StripeCustomerParams>) => {
  const response = await client.post<StripeCustomer>(
    '/customers',
    qs.stringify(params)
  )
  return response.data
}

export const getOrCreateCustomer = async (
  params: StripeServiceProps<StripeCustomerParams>
) => {
  let customer
  if (params.params.email) {
    customer = await stripeCustomerFindByEmailService(params)
  }
  if (!customer) {
    customer = await stripeCustomerCreateService(params)
  }
  return customer
}
