import { CommerceService } from '@composable/types'
import products from '../../data/products.json'

export const getProductBy: CommerceService['getProductBy'] = async ({
  slug,
}) => {
  return products.find((el) => el.slug === slug) ?? null
}
