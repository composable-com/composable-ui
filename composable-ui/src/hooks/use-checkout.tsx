import { useCallback, useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useIntl } from 'react-intl'
import { api } from 'utils/api'
import { CheckoutContext } from 'components/checkout/checkout-provider'
import { useCart } from './use-cart'
import { PAYMENT_METHOD } from 'components/checkout/constants'

export const useCheckout = () => {
  const context = useContext(CheckoutContext)
  const { client } = api.useContext()
  const { cart } = useCart()
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider')
  }

  const intl = useIntl()

  const {
    __setCheckoutResponse,
    __setIsLoading,
    __setCartSnapshot,
    ...publicContext
  } = context

  /**
   * Place Order Mutation
   */
  const placeOrderMutation = useMutation(
    ['cartCheckout'],
    async () => {
      const { config, ...state } = context.checkoutState
      __setCartSnapshot(cart)

      let __checkoutResponse = context.response.checkout
      let redirectUrl
      if (!__checkoutResponse) {
        try {
          const params = {
            ...state,
          }

          if (config.billingSameAsShipping) {
            params.billing_address = {
              ...context.checkoutState.shipping_address,
            }
          }

          const response =
            (await client.commerce.createOrder.mutate({ checkout: params })) ??
            undefined

          __checkoutResponse = response
          __setCheckoutResponse(response)

          if (
            publicContext.paymentHandler.selected?.key === PAYMENT_METHOD.STRIPE
          ) {
            // Stripe
            const stripePaymentIntent =
              await client.stripe.createPaymentIntent.mutate({
                paymentMethodId: context.payment.stripeData?.paymentMethodId,
                customerId: context.payment.stripeData?.customerId,
                cartId: cart.id!,
                redirectUrl:
                  window.location.origin +
                  `/checkout/success?order=${__checkoutResponse?.id}`,
              })

            redirectUrl = stripePaymentIntent?.next_action?.redirect_to_url.url
              ? stripePaymentIntent?.next_action?.redirect_to_url.url
              : `/checkout/success?order=${__checkoutResponse?.id}&payment_intent=${stripePaymentIntent.id}`
          } else {
            // Cash
            redirectUrl = `/checkout/success?order=${__checkoutResponse?.id}`
          }
        } catch (e: any) {
          throw new Error(
            intl.formatMessage({
              id: 'app.failure',
            })
          )
        }
      }

      if (!__checkoutResponse) {
        throw new Error(
          intl.formatMessage({
            id: 'checkout.validation.missingCheckoutResponse',
          })
        )
      }

      return {
        checkout: __checkoutResponse,
        redirectUrl,
      }
    },
    {
      onMutate: () => {
        __setIsLoading(true)
      },
      onError: () => {
        __setIsLoading(false)
      },
    }
  )

  const placeOrder = useCallback(() => {
    return placeOrderMutation.mutateAsync()
  }, [placeOrderMutation])

  return {
    ...publicContext,
    placeOrder,
  }
}
