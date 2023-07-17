import { useRouter } from 'next/router'
import { useCart } from '../../hooks'
import { CHECKOUT_STEP_KEY, hashStepMap } from './constants'
import { CheckoutProvider, CheckoutStepsProvider } from './checkout-provider'
import { CheckoutSteps } from './checkout-steps'
import { CheckoutLayout } from './layout'
import { useIntl } from 'react-intl'
import { NextSeo } from 'next-seo'

export const CheckoutPage = () => {
  const intl = useIntl()
  const router = useRouter()
  const { cart } = useCart()

  return (
    <>
      <NextSeo
        title={intl.formatMessage({ id: 'checkout.title' })}
        noindex
        nofollow
      />
      <CheckoutProvider>
        <CheckoutStepsProvider
          initialSteps={[
            {
              position: 1,
              key: CHECKOUT_STEP_KEY.STEP_1,
              hash: hashStepMap[CHECKOUT_STEP_KEY.STEP_1],
              isAllowed: true,
              title: intl.formatMessage({
                id: 'checkout.steps.link.deliveryOptions',
              }),
            },
            {
              position: 2,
              key: CHECKOUT_STEP_KEY.STEP_2,
              hash: hashStepMap[CHECKOUT_STEP_KEY.STEP_2],
              isAllowed: true,
              title: intl.formatMessage({ id: 'checkout.steps.link.payment' }),
            },
            {
              position: 3,
              key: CHECKOUT_STEP_KEY.STEP_3,
              hash: hashStepMap[CHECKOUT_STEP_KEY.STEP_3],
              isAllowed: false,
              title: intl.formatMessage({ id: 'checkout.steps.link.review' }),
            },
          ]}
        >
          <CheckoutLayout>
            <CheckoutSteps />
          </CheckoutLayout>
        </CheckoutStepsProvider>
      </CheckoutProvider>
    </>
  )
}
