import { Divider, Stack } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useCheckoutSteps } from '../checkout-provider'
import { useCheckout } from '../../../hooks'
import { CheckoutDetailItem } from '../checkout-detail-item'
import { api } from '../../../utils/api'
import { CHECKOUT_STEP_KEY, PAYMENT_METHOD, hashStepMap } from '../constants'

export const PaymentDetails = () => {
  const intl = useIntl()
  const { checkoutState, payment, paymentHandler } = useCheckout()
  const {
    billing_address,
    config: { billingSameAsShipping },
  } = checkoutState
  const { goTo } = useCheckoutSteps()

  const backToStep2 = () => {
    goTo(hashStepMap[CHECKOUT_STEP_KEY.STEP_2])
  }

  const { data: paymentMethod } = api.stripe.getPaymentMethod.useQuery({
    paymentMethodId: payment.stripeData?.paymentMethodId ?? '',
  })

  const stripePaymentDetails =
    paymentHandler.selected?.key === PAYMENT_METHOD.STRIPE && paymentMethod
      ? [
          `${paymentMethod.brand ?? 'XXXX'} XXXX-${
            paymentMethod.last4 ?? 'XXXX'
          }`,
          `${paymentMethod.exp_month ?? 'XX'}/${
            paymentMethod.exp_year ?? 'XXXX'
          }`,
        ]
      : undefined

  const cashPaymentDetails = [
    intl.formatMessage({
      id: 'checkout.paymentSection.offlinePayment',
    }),
  ]

  return (
    <Stack spacing="sm" divider={<Divider />}>
      <CheckoutDetailItem
        title={intl.formatMessage({
          id: 'checkout.payment.paymentMethodSection.title',
        })}
        details={
          payment.stripeData?.paymentMethodId
            ? stripePaymentDetails
            : cashPaymentDetails
        }
        onClickEdit={backToStep2}
      />

      <CheckoutDetailItem
        title={intl.formatMessage({
          id: 'checkout.payment.paymentMethodSection.billingAddressSubsection.title',
        })}
        details={
          billingSameAsShipping
            ? [
                intl.formatMessage({
                  id: 'checkout.payment.paymentMethodSection.billingAddressSubsection.sameAsShipping',
                }),
              ]
            : Object.values(billing_address).some((val) => !!val)
            ? [
                billing_address.full_name,
                billing_address.address_line_1,
                `${billing_address.city}, ${billing_address.state}, ${billing_address.postcode}, ${billing_address.country}`,
              ]
            : undefined
        }
        onClickEdit={backToStep2}
      />
    </Stack>
  )
}
