import { CommerceService } from '@composable/types'
import { generateCartData } from '../../data/generateCartData'
import cart from '../../data/cart.json'

export const getCart: CommerceService['getCart'] = async ({ cartId }) => {
  if (!cartId) {
    return null
  }

  const { items, summary } = generateCartData()

  return {
    ...cart,
    items,
    summary,
  }
}
