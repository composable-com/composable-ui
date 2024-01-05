import { Cart } from '@composable/types'
import {
  PromotionsValidateResponse,
  StackableRedeemableResponse,
  ValidationValidateStackableResponse,
  VoucherifyServerSide,
} from '@voucherify/sdk'
import {
  getRedeemablesForValidation,
  getRedeemablesForValidationFromPromotions,
} from './get-redeemables-for-validation'
import { cartToVoucherifyOrder } from './cart-to-voucherify-order'

type ValidateDiscountsParam = {
  cart: Cart
  code?: string
  voucherify: ReturnType<typeof VoucherifyServerSide>
}

export type ValidateCouponsAndPromotionsResponse = {
  promotionsResult: PromotionsValidateResponse
  validationResult: ValidateStackableResult
}

export type ValidateStackableResult =
  | false
  | (ValidationValidateStackableResponse & {
      inapplicable_redeemables?: StackableRedeemableResponse[]
    })

export const validateCouponsAndPromotions = async (
  params: ValidateDiscountsParam
): Promise<ValidateCouponsAndPromotionsResponse> => {
  const { cart, code, voucherify } = params

  const appliedCodes =
    cart.vouchersApplied?.map((voucher) => voucher.code) || []

  const order = cartToVoucherifyOrder(cart)
  const codes = code ? [...appliedCodes, code] : appliedCodes

  const promotionsResult = await voucherify.promotions.validate({ order })
  if (!codes.length && !promotionsResult.promotions?.length) {
    return { promotionsResult, validationResult: false }
  }

  const validationResult = await voucherify.validations.validateStackable({
    redeemables: [
      ...getRedeemablesForValidation(codes),
      ...getRedeemablesForValidationFromPromotions(promotionsResult),
    ],
    order,
    options: { expand: ['order'] },
  })

  return { promotionsResult, validationResult }
}
