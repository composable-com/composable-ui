import { CommerceService } from '@composable/types'
import { generateCartData } from '../../data/generateCartData'
import cart from '../../data/cart.json'

export const addCartItem: CommerceService['addCartItem'] = async ({
  cartId,
  productId,
  quantity,
  variantId,
}) => {
  const { items, summary } = generateCartData({ productId, quantity })

  return {
    ...cart,
    items,
    summary,
  }
}
