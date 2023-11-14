import { useIntl, IntlShape } from 'react-intl'
import * as yup from 'yup'
import { Text, Stack } from '@chakra-ui/react'
import { useCheckoutForm, UseCheckoutFormProps } from '../use-checkout-form'
import { InputField } from '@composable/ui'
import { CHECKOUT_FORM_KEY } from '../constants'
import { CheckoutInput } from '@composable/types'

type FormData = Omit<CheckoutInput['customer'], 'id' | 'name' | 'cartId'>

type GuestFormProps = Pick<
  UseCheckoutFormProps<FormData>,
  'onChange' | 'initialValues'
>

export const FormGuest = ({ initialValues, onChange }: GuestFormProps) => {
  const intl = useIntl()
  const { form } = useCheckoutForm<FormData>({
    onChange,
    formKey: CHECKOUT_FORM_KEY.GUEST,
    yupSchema: guestFormSchema({ intl }),
    initialValues: {
      email: initialValues.email,
    },
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
      <Stack spacing="1rem" direction="column">
        <InputField
          label={intl.formatMessage({
            id: 'checkout.forms.input.emailAddress.label',
          })}
          inputProps={{
            ...register('email'),
            placeholder: intl.formatMessage({
              id: 'checkout.forms.input.emailAddress.placeholder',
            }),
          }}
          error={errors.email}
          caption={intl.formatMessage({
            id: 'checkout.forms.input.emailAddress.caption',
          })}
          isRequired
        />
      </Stack>
    </form>
  )
}

const guestFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),
  })
}
