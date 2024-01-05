import { Order } from '@composable/types'
import { OrdersCreate } from '@voucherify/sdk'
import { toCent } from './to-cent'

export const orderToVoucherifyOrder = (order: Order): OrdersCreate => {
  return {
    amount: toCent(order.summary.priceBeforeDiscount),
    items: order.items.map((item) => ({
      quantity: item.quantity,
      product_id: item.id,
      sku_id: item.sku,
      price: (item.price + item.tax) * 100,
    })),
  }
}
