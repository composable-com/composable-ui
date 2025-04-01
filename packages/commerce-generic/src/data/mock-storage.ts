/**
 *  IMPORTANT: The following implementation is purely for demonstration purposes and should NEVER be used in a Production environment.
 *
 *  The current persistence mechanism leverages storing data as JSON documents in the serverless functions' file system.
 *  Keep in mind that these files may be destroyed and recreated by the Cloud Provider (e.g., Vercel or Netlify) at any time.
 *  As a result, users with a working cart containing items may experience data loss and need to start anew if serverless
 *  functions are reinitialized. This is not suitable for a Production environment where data persistence and reliability are critical.
 */
import storage from 'node-persist'
import path from 'path'
import os from 'os'
import { Order, Cart, Wishlist, WishlistItem } from '@composable/types'
import { v4 as uuidv4 } from 'uuid'

const storageFolderPath = path.join(os.tmpdir(), 'composable-ui-storage')

storage.init({
  dir: storageFolderPath,
})

export const getOrder = async (orderId: string): Promise<Order | undefined> => {
  return storage.getItem(`order-${orderId}`)
}

export const saveOrder = async (order: Order) => {
  await storage.setItem(`order-${order.id}`, order)
  return order
}

export const getCart = async (cartId: string): Promise<Cart | undefined> => {
  return storage.getItem(`cart-${cartId}`)
}

export const saveCart = async (cart: Cart) => {
  await storage.setItem(`cart-${cart.id}`, cart)
  return cart
}

export const deleteCart = async (cartId: string) => {
  const result = await storage.del(`cart-${cartId}`)
  return result.removed
}

export const getWishlist = async (
  wishlistId: string
): Promise<Wishlist | undefined> => {
  console.log('martin getWishlist -- input', wishlistId)
  const resp = await storage.getItem(`wishlist-${wishlistId}`)
  console.log('martin storage', resp)
  return resp
}

export const saveWishlist = async (wishlist: Wishlist) => {
  console.log('martin saving wishlist', wishlist.wishlistId)
  await storage.setItem(`wishlist-${wishlist.wishlistId}`, wishlist)
  return wishlist
}

export const deleteWishlist = async (wishlistId: string) => {
  const result = await storage.del(`wishlist-${wishlistId}`)
  return result.removed
}

export const createWishlist = async ({
  wishlistId,
  userId,
  name,
  items,
}: {
  wishlistId: string
  userId: string
  name: string
  items: Omit<WishlistItem, 'id'>[]
}) => {
  // const exists = await getWishlist(wishlistId)
  // if (exists) {
  //   return exists
  // }
  const wishlist: Wishlist = {
    wishlistId,
    userId,
    name,
    items: items.map((item) => ({
      ...item,
      id: uuidv4(),
    })),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  console.log('createWishlist result 1', wishlist)
  const save = await saveWishlist(wishlist)
  console.log('createWishlist result 2', save)
  return save
}

export const addWishlistItem = async ({
  wishlistId,
  userId,
  productId,
  name,
  brand,
  sku,
  type,
  price,
  image,
  slug,
}: {
  wishlistId: string
  userId: string
  productId: string
  name: string
  brand: string
  sku: string
  type: string
  price: number
  image: {
    url: string
    alt?: string
  }
  slug: string
}) => {
  console.log('MARTIN ADD WISHLIST ITEM - wishlistId', wishlistId)
  console.log('MARTIN ADD WISHLIST ITEM - userId', userId)
  if (!wishlistId) {
    throw new Error('Wishlist ID is required')
  }
  let wishlist = await getWishlist(wishlistId)
  console.log('martin addWishlistItem wishlist', wishlist)
  if (!wishlist) {
    wishlist = await createWishlist({
      userId: userId,
      wishlistId: wishlistId,
      name: 'Default Wishlist',
      items: [],
    })
  }
  const newItem: WishlistItem = {
    id: uuidv4(),
    productId,
    name,
    brand,
    sku,
    type,
    price,
    image,
    slug,
  }

  wishlist.items.push(newItem)
  wishlist.updatedAt = Date.now()
  // return wishlist
  return saveWishlist(wishlist)
}
export const removeWishlistItem = async ({
  userId,
  itemId,
}: {
  userId: string
  itemId: string
}) => {
  const wishlist = await getWishlist(userId)
  if (!wishlist) {
    throw new Error('Wishlist not found')
  }

  wishlist.items = wishlist.items.filter((item) => item.id !== itemId)
  wishlist.updatedAt = Date.now()
  return saveWishlist(wishlist)
}
