import { CommerceService } from '@composable/types'
import cart from '../../data/cart.json'

export const deleteCartItem: CommerceService['deleteCartItem'] = async ({
  cartId,
  productId,
}) => {
  return cart
}
