import { CommerceService } from '@composable/types'
import { removeWishlistItem as removeWishlistItemFromStorage } from '../../data/mock-storage'

export const removeWishlistItem: CommerceService['removeWishlistItem'] =
  async ({ userId, itemId }) => {
    const wishlist = await removeWishlistItemFromStorage({ userId, itemId })
    return wishlist
  }
