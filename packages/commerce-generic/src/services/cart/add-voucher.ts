import { CommerceService } from '@composable/types'
import {
  getCart as getCartFromStorage,
  saveCart,
} from '../../data/mock-storage'
import { addVoucherToCart } from './discount'

export const addVoucher: CommerceService['addVoucher'] = async ({
  cartId,
  code,
}) => {
  const cart = await getCartFromStorage(cartId)

  if (!cart) {
    throw new Error(
      `[updateCartItem] Could not found cart with requested cart id: ${cartId}`
    )
  }

  const {
    cart: cartWithDiscount,
    errorMessage,
    success,
  } = await addVoucherToCart(cart, code)

  if (success) {
    await saveCart(cartWithDiscount)
  }

  return {
    cart: cartWithDiscount,
    success,
    errorMessage,
  }
}
