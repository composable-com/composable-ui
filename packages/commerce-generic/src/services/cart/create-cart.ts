import { CommerceService } from '@composable/types'
import { saveCart } from '../../data/persit'
import { generateEmptyCart } from '../../data/generate-cart-data'

export const createCart: CommerceService['createCart'] = async () => {
  return saveCart(generateEmptyCart())
}
