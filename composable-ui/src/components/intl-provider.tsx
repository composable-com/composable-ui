import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { useComposable } from 'hooks'
import { api } from 'utils/api'

interface Props {
  children: JSX.Element
}

export const IntlProvider = ({ children }: Props) => {
  const { locale } = useComposable()
  const { data: intlConfig } = api.config.intl.useQuery()
  const messages = intlConfig?.find((el) => el.locale === locale)

  return (
    <ReactIntlProvider locale={locale ?? ''} messages={messages?.keys ?? {}}>
      {children}
    </ReactIntlProvider>
  )
}
