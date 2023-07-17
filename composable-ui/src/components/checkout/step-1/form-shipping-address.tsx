import * as yup from 'yup'
import { useIntl, IntlShape } from 'react-intl'
import { InputField } from '@composable/ui'
import { Stack } from '@chakra-ui/react'
import { UseCheckoutFormProps, useCheckoutForm } from '../use-checkout-form'
import { CHECKOUT_FORM_KEY } from '../constants'
import { CheckoutInput } from '@composable/types'

type FormData = CheckoutInput['shipping_address']

type ShippingAddressFormProps = Pick<
  UseCheckoutFormProps<FormData>,
  'onChange' | 'initialValues'
>

export const FormShippingAddress = ({
  initialValues,
  onChange,
}: ShippingAddressFormProps) => {
  const intl = useIntl()
  const { form } = useCheckoutForm<FormData>({
    onChange,
    formKey: CHECKOUT_FORM_KEY.SHIPPING,
    yupSchema: shippingAddressFormSchema({ intl }),
    initialValues,
  })

  const {
    register,
    formState: { errors },
  } = form

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <Stack spacing="sm" direction="column">
        <InputField
          label={intl.formatMessage({
            id: 'checkout.forms.input.fullName.label',
          })}
          inputProps={register('full_name')}
          error={errors.full_name}
          isRequired
        />

        <InputField
          label={intl.formatMessage({
            id: 'checkout.forms.input.address.label',
          })}
          inputProps={register('address_line_1')}
          error={errors.address_line_1}
          isRequired
        />

        <Stack spacing="1rem" direction={{ base: 'column', md: 'row' }}>
          <InputField
            label={intl.formatMessage({
              id: 'checkout.forms.input.country.label',
            })}
            inputProps={register('country')}
            error={errors.country}
            isRequired
          />
          <InputField
            label={intl.formatMessage({
              id: 'checkout.forms.input.zipCode.label',
            })}
            inputProps={register('postcode')}
            error={errors.postcode}
            isRequired
          />
        </Stack>

        <Stack spacing="1rem" direction={{ base: 'column', md: 'row' }}>
          <InputField
            label={intl.formatMessage({
              id: 'checkout.forms.input.state.label',
            })}
            inputProps={register('state')}
            error={errors.state}
            isRequired
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
    </form>
  )
}

const shippingAddressFormSchema = (deps: { intl: IntlShape }) => {
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
  })
}
