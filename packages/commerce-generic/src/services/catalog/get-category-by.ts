import { Category, CommerceService } from '@composable/types'
import products from '../../data/products.json'
import categories from '../../data/categories.json'

export const getCategoryBy: CommerceService['getCategoryBy'] = async ({
  slug,
}) => {
  const _categoryData = categories.find((el) => el.slug === slug) ?? null

  if (!_categoryData) {
    return null
  }

  const category: Category = {
    ..._categoryData,
  }

  category.products = products.filter((product) => product.category === slug)

  return category
}
