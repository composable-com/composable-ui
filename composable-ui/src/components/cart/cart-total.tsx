import { useIntl } from 'react-intl'
import { CartData, useCart } from 'hooks'
import { Price } from 'components/price'
import { Flex, Text, FlexProps } from '@chakra-ui/react'

interface CartTotalProps {
  rootProps?: FlexProps
  cartData?: CartData
}

export const CartTotal = ({ cartData, rootProps }: CartTotalProps) => {
  const { cart } = useCart()
  const intl = useIntl()
  const _cartData = cartData ?? cart

  return (
    <>
      <Flex
        justify="space-between"
        textStyle={{ base: 'Desktop/S', md: 'Mobile/S' }}
        mb={'1rem'}
        {...rootProps}
      >
        <Text>{intl.formatMessage({ id: 'cart.summary.estimatedTotal' })}</Text>
        <Price price={_cartData.summary?.totalPrice ?? ''} />
      </Flex>
    </>
  )
}
