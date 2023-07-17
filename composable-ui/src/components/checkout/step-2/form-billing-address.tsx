import * as yup from 'yup'
import { useIntl, IntlShape } from 'react-intl'
import { InputField } from '@composable/ui'
import { CheckoutInput } from '@composable/types'
import { Checkbox, Stack, Text, Box } from '@chakra-ui/react'
import { useCheckout } from 'hooks'
import { UseCheckoutFormProps, useCheckoutForm } from '../use-checkout-form'
import { CHECKOUT_FORM_KEY } from '../constants'

type FormData = CheckoutInput['billing_address']

type ShippingAddressFormProps = Pick<
  UseCheckoutFormProps<FormData>,
  'onChange' | 'initialValues'
>

export const FormBillingAddress = ({
  initialValues,
  onChange,
}: ShippingAddressFormProps) => {
  const intl = useIntl()
  const { form } = useCheckoutForm<FormData>({
    onChange,
    formKey: CHECKOUT_FORM_KEY.BILLING,
    yupSchema: billingAddressFormSchema({ intl }),
    initialValues,
  })

  const {
    register,
    formState: { errors },
  } = form

  const { checkoutState, setCheckoutState } = useCheckout()
  const { shipping_address } = checkoutState
  const { billingSameAsShipping } = checkoutState.config

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Checkbox
        size="sm"
        marginBottom="sm"
        isChecked={billingSameAsShipping}
        onChange={() =>
          setCheckoutState({
            ...checkoutState,
            config: {
              ...checkoutState.config,
              billingSameAsShipping: !billingSameAsShipping,
            },
          })
        }
        fontWeight="medium"
      >
        {intl.formatMessage({
          id: 'checkout.payment.paymentMethodSection.billingAddressSubsection.sameAsShipping',
        })}
      </Checkbox>

      {billingSameAsShipping &&
        Object.values(shipping_address).some((val) => !!val) && (
          <Box fontSize="sm">
            <Text>{shipping_address.full_name}</Text>
            <Text>{shipping_address.address_line_1}</Text>
            <Text>
              {`${shipping_address.city}, ${shipping_address.state}, ${shipping_address.postcode}, ${shipping_address.country}`}
            </Text>
          </Box>
        )}

      {!billingSameAsShipping && (
        <Stack py="5" spacing="sm" direction="column">
          <InputField
            label={intl.formatMessage({
              id: 'checkout.forms.input.fullName.label',
            })}
            inputProps={register('full_name')}
            error={errors.full_name}
          />

          <InputField
            label={intl.formatMessage({
              id: 'checkout.forms.input.address.label',
            })}
            inputProps={register('address_line_1')}
            error={errors.address_line_1}
          />

          <Stack spacing="sm" direction={{ base: 'column', md: 'row' }}>
            <InputField
              label={intl.formatMessage({
                id: 'checkout.forms.input.country.label',
              })}
              inputProps={register('country')}
              error={errors.country}
            />
            <InputField
              label={intl.formatMessage({
                id: 'checkout.forms.input.zipCode.label',
              })}
              inputProps={register('postcode')}
              error={errors.postcode}
            />
          </Stack>

          <Stack spacing="sm" direction={{ base: 'column', md: 'row' }}>
            <InputField
              label={intl.formatMessage({
                id: 'checkout.forms.input.state.label',
              })}
              inputProps={register('state')}
              error={errors.state}
            />
            <InputField
              label={intl.formatMessage({
                id: 'checkout.forms.input.city.label',
              })}
              inputProps={register('city')}
              error={errors.city}
            />
          </Stack>

          <InputField
            label={intl.formatMessage({
              id: 'checkout.forms.input.phoneNumber.label',
            })}
            inputProps={register('phone_number')}
            error={errors.phone_number}
          />
        </Stack>
      )}
    </form>
  )
}

const billingAddressFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    full_name: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),

    address_line_1: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),

    country: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),

    postcode: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),

    state: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),

    city: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
  })
}
