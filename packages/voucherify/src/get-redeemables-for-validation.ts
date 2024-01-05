import { PromotionsValidateResponse } from '@voucherify/sdk'

export const getRedeemablesForValidation = (codes: string[]) =>
  codes.map((code) => ({
    id: code,
    object: 'voucher' as const,
  }))

export const getRedeemablesForValidationFromPromotions = (
  promotionResult: PromotionsValidateResponse
) =>
  promotionResult.promotions?.map((promotion) => ({
    id: promotion.id,
    object: 'promotion_tier' as const,
  })) || []
