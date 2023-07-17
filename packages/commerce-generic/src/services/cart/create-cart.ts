import { CommerceService } from '@composable/types'
import cart from '../../data/cart.json'

export const createCart: CommerceService['createCart'] = async () => {
  return cart
}
