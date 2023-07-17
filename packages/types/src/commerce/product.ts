export interface Product {
  id: string
  category: string
  type: string
  name: string
  brand: string
  price: number
  description: string
  materialAndCare: string
  images: Array<{ url: string; alt: string }>
  sku: string
  slug: string
  updatedAt: number
}
