import { Divider, Stack } from '@chakra-ui/react'
import { useCheckout } from 'hooks'
import { useIntl } from 'react-intl'
import { useCheckoutSteps } from './checkout-provider'
import { CheckoutDetailItem } from './checkout-detail-item'
import { CHECKOUT_STEP_KEY, hashStepMap } from './constants'

export const DeliveryOptionsDetails = () => {
  const intl = useIntl()
  const { checkoutState, shippingOptions } = useCheckout()
  const { customer, shipping_address } = checkoutState
  const { goTo } = useCheckoutSteps()

  const backToStep1 = () => {
    goTo(hashStepMap[CHECKOUT_STEP_KEY.STEP_1])
  }

  return (
    <Stack spacing="sm" divider={<Divider />}>
      {customer.email && (
        <CheckoutDetailItem
          title={intl.formatMessage({
            id: 'checkout.delivery.confirmationEmailSection.title',
          })}
          details={[customer.email]}
          onClickEdit={backToStep1}
        />
      )}
      {Object.values(shipping_address).some((val) => !!val) && (
        <CheckoutDetailItem
          title={intl.formatMessage({
            id: 'checkout.delivery.shippingAddressSection.title',
          })}
          details={[
            shipping_address.full_name,
            shipping_address.address_line_1,
            `${shipping_address.city}, ${shipping_address.state}, ${shipping_address.postcode}, ${shipping_address.country}`,
          ]}
          onClickEdit={backToStep1}
        />
      )}
      {shippingOptions.selected && (
        <CheckoutDetailItem
          title={intl.formatMessage({
            id: 'checkout.delivery.shippingSection.title',
          })}
          details={[shippingOptions.selected.name]}
          onClickEdit={backToStep1}
        />
      )}
    </Stack>
  )
}
