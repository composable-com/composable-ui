import { CommerceService } from '@composable/types'
import { addWishlistItem as addWishlistItemToStorage } from '../../data/mock-storage'

export const addWishlistItem: CommerceService['addWishlistItem'] = async ({
  wishlistId,
  productId,
  name,
  brand,
  sku,
  type,
  price,
  image,
  slug,
}) => {
  const wishlist = await addWishlistItemToStorage({
    wishlistId,
    productId,
    name,
    brand,
    sku,
    type,
    price,
    image,
    slug,
  })
  return wishlist
}
