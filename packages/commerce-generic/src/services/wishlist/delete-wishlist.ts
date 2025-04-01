import { CommerceService } from '@composable/types'
import { deleteWishlist as deleteWishlistFromStorage } from '../../data/mock-storage'

export const deleteWishlist: CommerceService['deleteWishlist'] = async ({
  wishlistId,
}) => {
  await deleteWishlistFromStorage({ wishlistId })
  return true
}
