import { Dispatch, SetStateAction } from 'react'
import { CheckoutInput, Order, ShippingMethod } from '@composable/types'
import { CartData } from 'hooks'
import { IconType } from 'react-icons'
import { UseMutationResult } from '@tanstack/react-query'

export interface CheckoutState extends CheckoutInput {
  config: {
    billingSameAsShipping: boolean
    gdpr: boolean
  }
}

export interface CheckoutContextProps {
  checkoutState: CheckoutState
  cartSnapshot: CartData
  setCheckoutState: Dispatch<SetStateAction<CheckoutState>>
  validation: CheckoutValidationHandler
  response: {
    checkout: undefined | Order
  }
  shippingOptions: {
    options: ShippingMethod[]
    isLoading: boolean
    selected?: ShippingMethod
    __setSelectedId: Dispatch<SetStateAction<string | undefined>>
  }
  payment: {
    stripeData?: StripeData
    setStripeData: Dispatch<SetStateAction<StripeData | undefined>>
  }
  paymentHandler: PaymentMethodHandlerState
  isLoading: boolean
  __setCheckoutResponse: Dispatch<SetStateAction<Order | undefined>>
  __setIsLoading: Dispatch<SetStateAction<boolean>>
  __setCartSnapshot: Dispatch<SetStateAction<CartData>>
}

export type CheckoutValidationFn = () => Promise<boolean>

export type CheckoutValidationList = Partial<
  Record<string, CheckoutValidationFn>
>

export type CheckoutValidationResult = Partial<Record<string, boolean>>

export type CheckoutValidationHandler = {
  register: (key: string, validation: CheckoutValidationFn) => void
  unregister: (key: string) => void
  run: (key?: string) => Promise<boolean>
  list: CheckoutValidationList
  result: CheckoutValidationResult
}

export interface StripeData {
  customerId?: string
  paymentMethodId?: string
}

export interface PaymentMethodHandlerState {
  register: (paymentMethod: PaymentMethod) => void
  select: (key?: string) => void
  selected: (PaymentMethod & PaymentMethodHandlerFunctions) | undefined
  list: PaymentMethod[]
  setOnCapturePaymentDetails: (
    key: string,
    mutation: OnCapturePaymentDetailsMutation
  ) => void
  setOnConfirmOrder: (key: string, mutation: OnConfirmOrderMutation) => void
  paymentMethodExtraData?: Record<string, any>
  setPaymentMethodExtraData: SetStateAction<Record<string, any> | undefined>
}

export interface PaymentMethod {
  key: string
  title: string
  icon?: IconType
  disabled?: boolean
}

export interface PaymentMethodHandlerFunctions {
  onPaymentDetailsCapture?: OnCapturePaymentDetailsMutation
  onConfirmOrder?: OnConfirmOrderMutation
}

export type OnCapturePaymentDetailsMutation = UseMutationResult<
  void,
  unknown,
  void
>

export type OnConfirmOrderMutation = UseMutationResult<void, unknown, void>
