import { AxiosInstance } from 'axios'

export interface StripeServiceProps<T> {
  client: AxiosInstance
  params: T
}
