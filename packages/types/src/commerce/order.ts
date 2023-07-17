import { ShippingMethod } from './checkout'
import { Cart } from './cart'

export interface Order {
  id: string
  status: string
  payment: string
  shipping: string
  customer: {
    email: string
  }
  shipping_address: Address
  billing_address: Address
  shipping_method: ShippingMethod
  created_at: number
  items: Cart['items']
  summary: Cart['summary']
}

export interface Address {
  full_name: string
  phone_number: string
  address_line_1: string
  city: string
  postcode: string
  state: string
  country: string
}
