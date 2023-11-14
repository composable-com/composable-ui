export interface CheckoutInput {
  cartId: string
  customer: {
    id?: string
    email: string
  }
  billing_address: {
    full_name: string
    address_line_1: string
    country: string
    postcode: string
    state: string
    city?: string
    phone_number?: string
  }
  shipping_address: {
    full_name: string
    address_line_1: string
    country: string
    postcode: string
    state: string
    city?: string
    phone_number?: string
  }
}

export interface ShippingMethod {
  id: string
  name: string
  description?: string
  price: number
}
