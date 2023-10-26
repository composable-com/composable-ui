import { createContext, useMemo, useRef, useState, useEffect } from 'react'
import { Order } from '@composable/types'
import {
  CheckoutContextProps,
  CheckoutState,
  CheckoutValidationFn,
  CheckoutValidationHandler,
  CheckoutValidationList,
  CheckoutValidationResult,
  StripeData,
} from './types'
import { useCart } from 'hooks'
import { api } from '../../../utils/api'
import { usePaymentHandler } from './use-payment-handler'
import { useSession, signIn } from 'next-auth/react'

export const CheckoutContext = createContext<CheckoutContextProps | undefined>(
  undefined
)

export interface CheckoutProviderProps {
  children: JSX.Element
}

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const { cart } = useCart()
  const { data: session } = useSession()
  const [isLoading, __setIsLoading] = useState(false)
  const [cartSnapshot, __setCartSnapshot] = useState(cart)
  const paymentHandler = usePaymentHandler()

  const [checkoutResponse, __setCheckoutResponse] = useState<
    Order | undefined
  >()

  /**
   * Validation
   */

  const [validationList, setValidationList] = useState<CheckoutValidationList>(
    {}
  )

  const [validationResult, setValidationResult] =
    useState<CheckoutValidationResult>({})

  const validationListRef = useRef(validationList)
  validationListRef.current = validationList

  const validationHandler = useRef<CheckoutValidationHandler>({
    register: (key: string, validation: CheckoutValidationFn) => {
      setValidationList((list) => {
        return {
          ...list,
          [key]: validation,
        }
      })
    },

    unregister: (key: string) => {
      setValidationList((list) => {
        const _list = { ...list }
        delete _list[key]
        return _list
      })
    },

    run: async (key?: string) => {
      if (key) {
        const isValid = await validationListRef.current[key]?.()
        setValidationResult((state) => {
          return {
            ...state,
            [key]: isValid,
          }
        })
        return isValid ?? true
      }

      let isValid = true
      const keys = Object.keys(validationListRef.current)

      for (const key of keys) {
        const validationFn = validationListRef.current[key]
        if (validationFn) {
          isValid = isValid && (await validationFn())
          setValidationResult((state) => {
            return {
              ...state,
              [key]: isValid,
            }
          })
        }
      }

      return isValid
    },
    list: validationList,
    result: validationResult,
  })

  // Keep state up to date
  validationHandler.current.list = validationList
  validationHandler.current.result = validationResult

  /**
   * Checkout State
   */

  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    cartId: cart.id || '',
    config: {
      billingSameAsShipping: true,
      gdpr: false,
    },
    customer: {
      email: (session?.loggedIn && session?.user?.email) || '',
    },
    shipping_address: {
      full_name: '',
      address_line_1: '',
      country: '',
      postcode: '',
      state: '',
      city: '',
      phone_number: '',
    },
    billing_address: {
      full_name: '',
      address_line_1: '',
      country: '',
      postcode: '',
      state: '',
      city: '',
      phone_number: '',
    },
  })

  /**
   * Shipping methods
   */

  const shippingMethods = api.commerce.getShippingMethods.useQuery(undefined, {
    onSuccess: (sM) => {
      if (sM && sM.length === 1) __setSelectedShippingMethodId(sM[0].id)
    },
  })
  const [selectedShippingMethodId, __setSelectedShippingMethodId] =
    useState<string>()
  const selectedShippingMethod = useMemo(
    () =>
      shippingMethods?.data?.find(
        (shippingMethod) => shippingMethod.id === selectedShippingMethodId
      ),
    [shippingMethods?.data, selectedShippingMethodId]
  )

  /**
   * Payment
   */
  const [stripeData, setStripeData] = useState<StripeData>()

  /**
   * General
   */

  // Context value
  const checkoutContext: CheckoutContextProps = {
    checkoutState,
    cartSnapshot,
    setCheckoutState,
    validation: validationHandler.current,
    response: {
      checkout: checkoutResponse,
    },
    shippingOptions: {
      options: shippingMethods.data ?? [],
      isLoading: shippingMethods.isLoading,
      selected: selectedShippingMethod,
      __setSelectedId: __setSelectedShippingMethodId,
    },
    payment: {
      stripeData,
      setStripeData,
    },
    paymentHandler,
    isLoading,
    __setCheckoutResponse,
    __setIsLoading,
    __setCartSnapshot,
  }

  return (
    <CheckoutContext.Provider value={checkoutContext}>
      {children}
    </CheckoutContext.Provider>
  )
}
