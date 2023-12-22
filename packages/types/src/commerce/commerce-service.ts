import {
  Cart,
  Category,
  CheckoutInput,
  ShippingMethod,
  Order,
  User,
  Product,
  SitemapField,
} from './index'

export interface CommerceService {
  /**
   * Cart methods
   */

  addCartItem(params: {
    cartId: string
    productId: string
    variantId?: string
    quantity: number
  }): Promise<Cart>

  createCart(): Promise<Cart>

  deleteCartItem(params: { cartId: string; productId: string }): Promise<Cart>

  getCart(params: { cartId: string }): Promise<Cart | null>

  updateCartItem(params: {
    cartId: string
    productId: string
    quantity: number
  }): Promise<Cart>

  addVoucher(params: { cartId: string; code: string }): Promise<{
    cart: Cart
    success: boolean
    errorMessage?: string
  }>

  deleteVoucher(params: { cartId: string; code: string }): Promise<Cart>

  /**
   * Catalog methods
   */

  getCategoryBy(params: { slug: string }): Promise<Category | null>

  getCategories(): Promise<Category[] | null>

  getCategorySitemap(params: {
    siteUrl: string
  }): Promise<SitemapField[] | null>

  getProductBy(params: { slug: string }): Promise<Product | null>

  getProductSitemap: (params: {
    siteUrl: string
  }) => Promise<SitemapField[] | null>

  getProductStaticPaths?: () => Promise<Array<{
    params: { slug: string }
  }> | null>

  /**
   * Checkout methods
   */

  createOrder(params: { checkout: CheckoutInput }): Promise<Order | null>

  getOrder(params: { orderId: string }): Promise<Order | null>

  getShippingMethods(): Promise<ShippingMethod[] | null>

  /**
   * User methods
   */

  createUser(params: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<User | null>

  resetPassword(params: { email: string }): Promise<void>
}
