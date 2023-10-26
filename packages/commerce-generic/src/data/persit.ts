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
