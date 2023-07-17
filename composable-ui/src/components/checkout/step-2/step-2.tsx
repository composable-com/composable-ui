import { Button, Flex, Skeleton, Stack } from '@chakra-ui/react'
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useIntl } from 'react-intl'
import { useQuery } from '@tanstack/react-query'
import { memo, useState } from 'react'
import { Section, SectionHeader } from '@composable/ui'

import { api } from '../../../utils/api'
import { DeliveryOptionsDetails } from '../delivery-options-detail'
import { CHECKOUT_FORM_KEY, PAYMENT_METHOD } from '../constants'
import { PaymentMethodSection } from './payment-method-section'
import { useCheckout, useToast } from 'hooks'

export interface Step2Props {
  onSubmit: () => void
  stripeError?: boolean
}

const Step2 = memo(function Step2({
  onSubmit,
  stripeError = false,
}: Step2Props) {
  const intl = useIntl()
  const toast = useToast()
  const { checkoutState, isLoading, validation, payment, paymentHandler } =
    useCheckout()
  const stripe = useStripe()
  const elements = useElements()
  const [paymentIsLoading, setPaymentIsLoading] = useState(false)

  const reviewOrderEnabled = Boolean(paymentHandler.selected)

  const handleSubmit = async () => {
    if (!checkoutState.config.billingSameAsShipping) {
      const validations = await Promise.all([
        validation.run(CHECKOUT_FORM_KEY.BILLING),
      ])

      if (validations.some((isValid) => !isValid)) {
        return
      }
    }

    try {
      setPaymentIsLoading(true)

      // Stripe
      if (
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
        paymentHandler.selected?.key === PAYMENT_METHOD.STRIPE
      ) {
        if (!stripe || !elements) {
          throw new Error('Invalid Stripe or Elements')
        }
        const { setupIntent, error } = await stripe.confirmSetup({
          elements,
          redirect: 'if_required',
        })
        if (error) {
          throw new Error(error?.message || 'Unexpected Stripe response')
        }
        const paymentMethodId =
          typeof setupIntent.payment_method === 'string'
            ? setupIntent.payment_method
            : setupIntent.payment_method?.id ?? undefined
        payment.setStripeData((prev) => ({ ...prev, paymentMethodId }))
      }

      // Cash
      // call commerce provider
      onSubmit()
    } catch (e: unknown) {
      setPaymentIsLoading(false)
      toast({
        status: 'error',
        description: (e as Error).message,
      })
    }
  }

  return (
    <Stack gap={6}>
      <Section>
        <SectionHeader
          title={intl.formatMessage({
            id: 'checkout.payment.deliveryOptionsSection.title',
          })}
        />
        <DeliveryOptionsDetails />
      </Section>

      <Section>
        <SectionHeader
          title={intl.formatMessage({
            id: 'checkout.payment.paymentMethodSection.title',
          })}
        />
        <PaymentMethodSection stripeError={stripeError} />
      </Section>

      <Flex justifyContent="flex-end">
        <Button
          fontSize="base"
          w={{ base: 'full', md: 'fit-content' }}
          variant="solid"
          isLoading={isLoading || paymentIsLoading}
          isDisabled={!reviewOrderEnabled}
          onClick={handleSubmit}
        >
          {intl.formatMessage({ id: 'action.reviewOrder' })}
        </Button>
      </Flex>
    </Stack>
  )
})

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : Promise.resolve(null)

const Step2WithStripe = memo(function Step2WithStripe(props: Step2Props) {
  const { client } = api.useContext()
  const {
    payment,
    checkoutState: { customer },
  } = useCheckout()

  const {
    data: setupIntent,
    isLoading,
    isError,
  } = useQuery(
    ['stripe-setup-intent'],
    async () => {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) return null
      return client.stripe.createSetupIntent.mutate({
        usage: 'on_session',
        email: customer.email,
      })
    },
    {
      cacheTime: 0, // Remove from cache once step 2 finished to avoid error on next payments
      onSuccess: (data) => {
        payment.setStripeData((prev) => ({
          ...prev,
          customerId: data?.customer ?? undefined,
        }))
      },
    }
  )

  if (isLoading) {
    return <Skeleton height="full" />
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: setupIntent?.client_secret }}
    >
      <Step2 stripeError={isError || setupIntent === null} {...props} />
    </Elements>
  )
})

export { Step2WithStripe as Step2 }
