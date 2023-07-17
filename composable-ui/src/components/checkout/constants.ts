export const CHECKOUT_STEP_KEY = {
  STEP_1: 'step1',
  STEP_2: 'step2',
  STEP_3: 'step3',
} as const

export const CHECKOUT_FORM_KEY = {
  GDPR: 'gdprForm',
  GUEST: 'guestForm',
  SHIPPING: 'shippingForm',
  BILLING: 'billingForm',
} as const

export const PAYMENT_METHOD = {
  STRIPE: 'stripe',
  CASH: 'cash',
}

export const hashStepMap = {
  [CHECKOUT_STEP_KEY.STEP_1]: '',
  [CHECKOUT_STEP_KEY.STEP_2]: 'payment',
  [CHECKOUT_STEP_KEY.STEP_3]: 'review',
}
