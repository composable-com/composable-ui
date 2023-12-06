import { CommerceService } from '@composable/types'
import { getCart, saveCart } from '../../data/mock-storage'

import { calculateCartSummary } from '../../data/generate-cart-data'
import { updateCartDiscount } from './discount'

export const deleteCartItem: CommerceService['deleteCartItem'] = async ({
  cartId,
  productId,
}) => {
  const cart = await getCart(cartId)

  if (!cart) {
    throw new Error(
      `[deleteCartItem] Could not found cart with requested cart id: ${cartId}`
    )
  }

  cart.items = cart.items.filter((item) => item.id !== productId)
  cart.summary = calculateCartSummary(cart.items)

  const cartWithDiscount = await updateCartDiscount(cart)

  return saveCart(cartWithDiscount)
}
