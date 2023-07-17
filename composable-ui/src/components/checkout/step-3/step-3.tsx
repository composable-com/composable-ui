import { useIntl } from 'react-intl'
import { useCheckout } from '../../../hooks'
import { useCheckoutSteps } from '../checkout-provider'
import { memo, useEffect } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import { Section, SectionHeader } from '@composable/ui'
import { DeliveryOptionsDetails } from '../delivery-options-detail'
import { PaymentDetails } from './payment-details'
import { PlaceOrderButton } from '../place-order-button'
import { CHECKOUT_STEP_KEY, hashStepMap } from '../constants'

export const Step3 = memo(function Step3() {
  const intl = useIntl()
  const {
    payment: { stripeData },
  } = useCheckout()
  const { goTo } = useCheckoutSteps()

  useEffect(() => {
    if (!stripeData) {
      goTo(hashStepMap[CHECKOUT_STEP_KEY.STEP_2])
    }
  }, [stripeData, goTo])

  return (
    <Stack spacing={'1.5rem'}>
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
            id: 'checkout.review.paymentSection.title',
          })}
        />
        <PaymentDetails />
      </Section>

      <Box textAlign="right">
        <PlaceOrderButton w={{ base: 'full', md: 'fit-content' }} />
      </Box>
    </Stack>
  )
})
