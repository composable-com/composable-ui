import { CommerceService } from '@composable/types'
import { generateCartData } from '../../data/generateCartData'
import order from '../../data/order.json'
import shippingMethods from '../../data/shipping-methods.json'

export const createOrder: CommerceService['createOrder'] = async ({
  checkout,
}) => {
  const cartItems = generateCartData()
  return {
    ...order,
    ...cartItems,
    shipping_method: shippingMethods[0],
    created_at: Date.now(),
  }
}
