import { Heading, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface HeaderProps {
  query: string
}

export const Header = ({ query }: HeaderProps) => {
  const intl = useIntl()
  return (
    <Text as="h1" textStyle={'Desktop/2XL'} textTransform="capitalize">
      {intl.formatMessage({ id: 'category.search.shop' }, { query })}
    </Text>
  )
}
