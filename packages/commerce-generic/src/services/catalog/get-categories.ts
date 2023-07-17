import { CommerceService } from '@composable/types'
import categories from '../../data/categories.json'

export const getCategories: CommerceService['getCategories'] = async () => {
  return categories
}
