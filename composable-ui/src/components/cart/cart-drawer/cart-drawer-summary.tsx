import { Divider, Box, Flex, Text, Stack } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useCart } from 'hooks'
import { CartDrawerSummaryItem } from './cart-drawer-summary-item'
import { Price } from '../../price'
import { CartPromotions } from '../cart-promotions'
import { CartVouchers } from '../cart-vouchers'

export const CartDrawerSummary = () => {
  const { cart } = useCart()
  const intl = useIntl()

  const promotions = cart.promotionsApplied || []

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

      <Stack spacing="8">
        {promotions.length > 0 && (
          <Stack bg="shading.100" p={'0.7rem 1.5rem'} mb={'-5'}>
            <CartPromotions promotions={promotions} />
          </Stack>
        )}
        <Stack bg="shading.100" p={'0.7rem 1.5rem'} mb={'0'}>
          <CartVouchers />
        </Stack>
      </Stack>
      <Divider m={'10px 0'} />
      {cart.summary?.priceBeforeDiscount && (
        <CartDrawerSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.priceBeforeDiscount' })}
        >
          <Box>
            <Price
              rootProps={{ textStyle: 'Body-XS' }}
              price={cart.summary.priceBeforeDiscount}
            />
          </Box>
        </CartDrawerSummaryItem>
      )}

      {cart.summary?.totalDiscountAmount && (
        <>
          <CartDrawerSummaryItem
            label={intl.formatMessage({
              id: 'cart.summary.totalDiscountAmount',
            })}
          >
            <Box>
              <Price
                rootProps={{
                  textStyle: 'Body-XS',
                  color: 'green',
                }}
                price={`-${cart.summary.totalDiscountAmount}`}
              />
            </Box>
          </CartDrawerSummaryItem>
        </>
      )}
      {cart.summary?.totalPrice && (
        <>
          <Divider m={'10px 0'} />
          <Flex
            justify="space-between"
            textStyle={{ base: 'Mobile/S', md: 'Desktop/S' }}
          >
            <Text>{intl.formatMessage({ id: 'cart.summary.orderTotal' })}</Text>
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
