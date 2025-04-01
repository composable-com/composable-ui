export interface Wishlist {
  id: string
  userId: string
  name: string
  items: {
    id: string
    productId: string
    name: string
    brand: string
    sku: string
    type: string
    price: number
    image: {
      url: string
      alt?: string
    }
    slug: string
  }[]
  createdAt: number
  updatedAt: number
}
