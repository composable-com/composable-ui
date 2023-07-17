import { useIntl } from 'react-intl'
import { CheckboxField } from '@composable/ui'

export const FormNewsletter = () => {
  const intl = useIntl()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <CheckboxField
        content={intl.formatMessage({
          id: 'checkout.forms.checkbox.newsletter.label',
        })}
        checkboxProps={{ name: 'newsletter' }}
        contentProps={{ fontSize: 'sm' }}
      />
    </form>
  )
}
