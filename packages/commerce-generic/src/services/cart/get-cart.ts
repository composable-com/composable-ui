import { CommerceService } from '@composable/types'
import { getCart as getCartFromStorage } from '../../data/mock-storage'
import { updateCartDiscount } from './discount'

export const getCart: CommerceService['getCart'] = async ({ cartId }) => {
  if (!cartId) {
    return null
  }

  const cart = await getCartFromStorage(cartId)

  if (!cart) {
    return null
  }

  const cartWithDiscount = await updateCartDiscount(cart)

  return cartWithDiscount || null
}
