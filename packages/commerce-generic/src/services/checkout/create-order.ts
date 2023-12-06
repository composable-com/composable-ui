import { Cart, CheckoutInput, CommerceService, Order } from '@composable/types'
import { getCart } from '../../data/mock-storage'
import { saveOrder } from '../../data/mock-storage'
import shippingMethods from '../../data/shipping-methods.json'
import { randomUUID } from 'crypto'

const generateOrderFromCart = (
  cart: Cart,
  checkoutInput: CheckoutInput
): Order => {
  return {
    id: randomUUID(),
    status: 'complete',
    payment: 'unpaid',
    shipping: 'unfulfilled',
    customer: {
      email: checkoutInput.customer.email,
    },
    shipping_address: {
      phone_number: '',
      city: '',
      ...checkoutInput.shipping_address,
    },
    billing_address: {
      phone_number: '',
      city: '',
      ...checkoutInput.billing_address,
    },
    shipping_method: shippingMethods[0],
    created_at: Date.now(),
    items: cart.items,
    summary: cart.summary,
    vouchers_applied: cart.vouchersApplied || [],
    promotions_applied: cart.promotionsApplied || [],
  }
}

export const createOrder: CommerceService['createOrder'] = async ({
  checkout,
}) => {
  const cart = await getCart(checkout.cartId)

  if (!cart) {
    throw new Error(
      `[createOrder] Could not find cart by id: ${checkout.cartId}`
    )
  }

  const updatedOrder = generateOrderFromCart(cart, checkout)

  return await saveOrder(updatedOrder)
}
