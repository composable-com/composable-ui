import { Cart, Voucher, Promotion } from '@composable/types'
import { centToString, toCent } from './to-cent'

const examplePromotion: Promotion = {
  id: 'prom_1',
  label: 'Black Friday 2024 - 10$',
  discountAmount: '10',
}

const vouchersAvailable: Voucher[] = [
  { code: '5$OFF', label: '5 bucks off in winter', discountAmount: '5' },
  { code: '15$OFF', label: '15 bucks off in winter', discountAmount: '15' },
]

export const deleteVoucherFromCart = async (
  cart: Cart,
  code: string
): Promise<{ cart: Cart; success: boolean; errorMessage?: string }> => {
  const success = true
  const errorMessage = undefined
  const updatedCart = await updateCartDiscount({
    ...cart,
    vouchersApplied: [
      ...(cart.vouchersApplied?.filter((voucher) => voucher.code !== code) ||
        []),
    ],
  })
  return {
    cart: updatedCart,
    success,
    errorMessage,
  }
}

export const addVoucherToCart = async (
  cart: Cart,
  code: string
): Promise<{ cart: Cart; success: boolean; errorMessage?: string }> => {
  if (cart.vouchersApplied?.some((voucher) => voucher.code === code)) {
    return {
      cart,
      success: false,
      errorMessage: 'Voucher is already applied',
    }
  }
  const voucher = vouchersAvailable.find((voucher) => voucher.code === code)
  if (!voucher) {
    return {
      cart,
      success: false,
      errorMessage: 'Voucher not found',
    }
  }
  const success = true
  const errorMessage = undefined
  const updatedCart = await updateCartDiscount({
    ...cart,
    vouchersApplied: [...(cart.vouchersApplied || []), voucher],
  })
  return {
    cart: updatedCart,
    success,
    errorMessage,
  }
}

export const updateCartDiscount = async (cart: Cart): Promise<Cart> => {
  const voucherDiscountsInCents =
    cart.vouchersApplied?.reduce((sum, voucher) => {
      return sum + toCent(voucher.discountAmount)
    }, 0) || 0
  const totalDiscountAmountInCents =
    toCent(examplePromotion.discountAmount) + voucherDiscountsInCents
  const totalPrice = centToString(
    toCent(cart.summary.priceBeforeDiscount) - totalDiscountAmountInCents
  )
  return {
    ...cart,
    promotionsApplied: [{ ...examplePromotion }],
    vouchersApplied: cart.vouchersApplied,
    summary: {
      ...cart.summary,
      totalDiscountAmount: centToString(totalDiscountAmountInCents),
      totalPrice,
    },
  }
}
