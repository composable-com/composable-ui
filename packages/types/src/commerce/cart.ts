export interface Cart {
  id: string
  items: CartItem[]
  couponApplied?: Coupon
  summary: {
    subtotalPrice?: string
    taxes?: string
    totalPrice?: string
    shipping?: string
  }
}

interface Coupon {
  id: string
  code: string
  discount: string
}

export interface CartItem {
  id: string
  category: string
  type: string
  brand: string
  image: { url: string; alt: string }

  name: string
  price: number
  quantity: number
  sku: string
  slug: string
}
