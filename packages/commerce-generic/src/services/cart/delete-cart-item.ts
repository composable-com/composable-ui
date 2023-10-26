import { CommerceService } from '@composable/types'
import { getCart, saveCart } from '../../data/persit'

import { calculateCartSummary } from '../../data/generate-cart-data'

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

  return saveCart(cart)
}
