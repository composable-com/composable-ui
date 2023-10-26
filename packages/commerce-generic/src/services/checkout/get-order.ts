import { CommerceService } from '@composable/types'
import { getOrder as getOrerFromStorage } from '../../data/persit'
import order from '../../data/order.json'
import shippingMethods from '../../data/shipping-methods.json'

export const getOrder: CommerceService['getOrder'] = async ({ orderId }) => {
  const order = await getOrerFromStorage(orderId)

  if (!order) {
    throw new Error(`[getOrder] Could not found order: ${orderId}`)
  }

  return {
    ...order,
    shipping_method: shippingMethods[0],
    created_at: Date.now(),
  }
}
