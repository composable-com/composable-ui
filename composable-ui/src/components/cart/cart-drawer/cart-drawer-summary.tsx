import { Divider, Box, Flex, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useCart } from 'hooks'
import { CartDrawerSummaryItem } from './cart-drawer-summary-item'
import { Price } from '../../price'

export const CartDrawerSummary = () => {
  const { cart } = useCart()
  const intl = useIntl()

  return (
    <Box>
      <Divider m={'10px 0'} />

      {cart.summary?.subtotalPrice && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
        >
          <Price
            rootProps={{ textStyle: 'Mobile/Body-S' }}
            price={cart.summary.subtotalPrice}
          />
        </CartDrawerSummaryItem>
      )}

      {cart.summary?.taxes && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.taxes' })}
        >
          <Price
            rootProps={{ textStyle: 'Mobile/Body-S' }}
            price={cart.summary.taxes}
          />
        </CartDrawerSummaryItem>
      )}

      {cart.summary?.shipping && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.shipping' })}
        >
          <Price
            rootProps={{ textStyle: 'Mobile/Body-S' }}
            price={cart.summary.shipping}
          />
        </CartDrawerSummaryItem>
      )}
      <Divider m={'10px 0'} />

      {cart.summary?.totalPrice && (
        <>
          <Flex
            justify="space-between"
            textStyle={{ base: 'Mobile/S', md: 'Desktop/S' }}
          >
            <Text>
              {intl.formatMessage({ id: 'cart.summary.estimatedTotal' })}
            </Text>
            <Box>
              <Price
                rootProps={{ textStyle: 'Desktop/S' }}
                price={cart.summary.totalPrice}
              />
            </Box>
          </Flex>
        </>
      )}
    </Box>
  )
}
