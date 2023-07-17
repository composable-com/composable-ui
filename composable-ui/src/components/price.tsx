import { Box, BoxProps } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { APP_CONFIG } from 'utils/constants'

export interface PriceProps {
  rootProps?: BoxProps
  price?: string
}

export const Price = ({ rootProps, price }: PriceProps) => {
  const intl = useIntl()

  if (!price) {
    return null
  }

  const value = parseFloat(price)

  return (
    <Box {...rootProps}>
      {Number.isNaN(value)
        ? price
        : intl.formatNumber(parseFloat(price), {
            currency: APP_CONFIG.CURRENCY_CODE,
            style: 'currency',
          })}
    </Box>
  )
}
