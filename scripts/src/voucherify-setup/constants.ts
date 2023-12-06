const PACKAGE_JSON_PATH = '../../../packages/commerce-generic/package.json'
const DEPENDENCY_NAME = '@composable/voucherify'
const DEPENDENCY_VERSION = 'workspace:*'

const COMMERCE_GENERIC_FILE_PATHS = [
  '../../../packages/commerce-generic/src/services/cart/add-cart-item.ts',
  '../../../packages/commerce-generic/src/services/cart/delete-cart-item.ts',
  '../../../packages/commerce-generic/src/services/cart/discount.ts',
  '../../../packages/commerce-generic/src/services/cart/update-cart-item.ts',
  '../../../packages/commerce-generic/src/services/cart/get-cart.ts',
  '../../../packages/commerce-generic/src/services/cart/delete-voucher.ts',
  '../../../packages/commerce-generic/src/services/cart/add-voucher.ts',
]

const DEFAULT_IMPORT = "from './discount'"
const VOUCHERIFY_IMPORT = "from '@composable/voucherify'"

const CREATE_ORDER_FILE_PATH =
  '../../../packages/commerce-generic/src/services/checkout/create-order.ts'
const IMPORT_CONTENT = "import { orderPaid } from '@composable/voucherify'\n"
const NOTE_CONTENT = `/* Redemptions using Voucherify should only be performed when we receive information that the payment was successful.
    In this situation, the ‘payment’ property is always set as 'unpaid' (in 'generateOrderFromCart'),
    so to simulate the correct behavior, the ‘payment’ value was changed here to 'paid' and the ‘orderPaid’ function was called to trigger the redemptions process.*/`
const UPDATE_PAID_ORDER_CONTENT = `
    ${NOTE_CONTENT}
    updatedOrder.payment = 'paid'
    await orderPaid(updatedOrder)`
const UPDATED_ORDER_LINE =
  'const updatedOrder = generateOrderFromCart(cart, checkout)'

export {
  PACKAGE_JSON_PATH,
  DEPENDENCY_NAME,
  DEPENDENCY_VERSION,
  COMMERCE_GENERIC_FILE_PATHS,
  DEFAULT_IMPORT,
  VOUCHERIFY_IMPORT,
  CREATE_ORDER_FILE_PATH,
  IMPORT_CONTENT,
  UPDATE_PAID_ORDER_CONTENT,
  UPDATED_ORDER_LINE,
}
