import { CommerceService } from '@composable/types'
import { getWishlist as getWishlistFromStorage } from '../../data/mock-storage'

export const getWishlist: CommerceService['getWishlist'] = async ({
  userId,
}) => {
  console.log('martin getWishlist commerceservice', userId)
  if (!userId) {
    return null
  }

  const wishlist = await getWishlistFromStorage(userId)

  if (!wishlist) {
    return null
  }

  return wishlist
}
