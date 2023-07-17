import * as yup from 'yup'
import { useIntl, IntlShape } from 'react-intl'
import { useCheckoutForm, UseCheckoutFormProps } from '../use-checkout-form'
import { CheckboxField } from '@composable/ui'
import { CHECKOUT_FORM_KEY } from '../constants'

type FormData = {
  gdpr_consent: boolean
}

type GdprFormProps = Pick<
  UseCheckoutFormProps<FormData>,
  'onChange' | 'initialValues'
>

export const FormGdpr = ({ initialValues, onChange }: GdprFormProps) => {
  const intl = useIntl()
  const { form } = useCheckoutForm<FormData>({
    onChange,
    formKey: CHECKOUT_FORM_KEY.GDPR,
    yupSchema: gdprFormSchema({ intl }),
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
      <CheckboxField
        content={intl.formatMessage({
          id: 'checkout.forms.checkbox.gdpr.label',
        })}
        contentProps={{ fontSize: 'sm' }}
        checkboxProps={register('gdpr_consent')}
        error={errors.gdpr_consent}
        isRequired
      />
    </form>
  )
}

const gdprFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    gdpr_consent: yup
      .bool()
      .oneOf(
        [true],
        intl.formatMessage({ id: 'checkout.validation.agreeWithGdprRequired' })
      ),
  })
}
