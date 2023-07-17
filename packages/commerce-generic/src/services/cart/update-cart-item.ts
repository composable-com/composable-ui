import { CommerceService } from '@composable/types'
import { generateCartData } from '../../data/generateCartData'
import cart from '../../data/cart.json'

export const updateCartItem: CommerceService['updateCartItem'] = async ({
  cartId,
  productId,
  quantity,
}) => {
  const { items, summary } = generateCartData({ productId, quantity })

  return {
    ...cart,
    items,
    summary,
  }
}
