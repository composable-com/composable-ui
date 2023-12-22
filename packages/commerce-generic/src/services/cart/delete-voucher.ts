import { CommerceService } from '@composable/types'
import {
  getCart as getCartFromStorage,
  saveCart,
} from '../../data/mock-storage'
import { deleteVoucherFromCart } from './discount'
export const deleteVoucher: CommerceService['deleteVoucher'] = async ({
  cartId,
  code,
}) => {
  const cart = await getCartFromStorage(cartId)

  if (!cart) {
    throw new Error(
      `[updateCartItem] Could not found cart with requested cart id: ${cartId}`
    )
  }

  const { cart: cartWithDiscount, success } = await deleteVoucherFromCart(
    cart,
    code
  )

  if (success) {
    await saveCart(cartWithDiscount)
  }

  return cartWithDiscount
}
