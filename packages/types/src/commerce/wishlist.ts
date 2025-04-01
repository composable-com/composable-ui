export interface WishlistItem {
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
}

export interface Wishlist {
  wishlistId: string
  userId: string
  name: string
  items: WishlistItem[]
  createdAt: number
  updatedAt: number
}
