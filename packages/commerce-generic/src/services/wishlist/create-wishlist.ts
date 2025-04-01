import { CommerceService } from '@composable/types'
import { createWishlist as createWishlistInStorage } from '../../data/mock-storage'

export const createWishlist: CommerceService['createWishlist'] = async ({
  wishlistId,
  userId,
  name,
  items,
}) => {
  const wishlist = await createWishlistInStorage({
    wishlistId,
    userId,
    name,
    items,
  })
  return wishlist
}
