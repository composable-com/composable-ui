import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { CartData, useCart } from 'hooks'
import { Price } from 'components/price'
import { Button, Flex, Text, FlexProps } from '@chakra-ui/react'

interface CartTotalProps {
  rootProps?: FlexProps
  cartData?: CartData
}

export const CartTotal = ({ cartData, rootProps }: CartTotalProps) => {
  const router = useRouter()
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
      <Button
        onClick={() => {
          router.push('/checkout')
        }}
        w={{ base: 'full' }}
        maxW={{ base: 'full' }}
        variant={'solid'}
        size={'lg'}
      >
        {intl.formatMessage({ id: 'action.proceedToCheckout' })}
      </Button>
    </>
  )
}
