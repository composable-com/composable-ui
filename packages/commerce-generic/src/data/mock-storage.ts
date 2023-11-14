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
import { Order, Cart } from '@composable/types'

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
