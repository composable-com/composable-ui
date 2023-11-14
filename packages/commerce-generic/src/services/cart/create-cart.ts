import { CommerceService } from '@composable/types'
import { saveCart } from '../../data/mock-storage'
import { generateEmptyCart } from '../../data/generate-cart-data'

export const createCart: CommerceService['createCart'] = async () => {
  return saveCart(generateEmptyCart())
}
