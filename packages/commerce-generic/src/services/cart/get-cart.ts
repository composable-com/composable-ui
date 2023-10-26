import { CommerceService } from '@composable/types'
import { getCart as getCartFromStorage } from '../../data/persit'

export const getCart: CommerceService['getCart'] = async ({ cartId }) => {
  if (!cartId) {
    return null
  }

  return (await getCartFromStorage(cartId)) || null
}
