import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  Box,
  Divider,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useCart, useCheckout } from 'hooks'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { APP_CONFIG } from '../../utils/constants'
import { OrderTotals } from './order-totals'
import { ProductsList } from './products-list'

export interface CheckoutSidebarProps {
  itemsBoxProps?: AccordionProps
  showTitle?: boolean
}

export const OrderSummary = ({
  itemsBoxProps,
  showTitle = true,
}: CheckoutSidebarProps) => {
  const intl = useIntl()
  const { cart } = useCart()
  const { cartSnapshot } = useCheckout()
  const _cart = cart.isEmpty ? cartSnapshot : cart

  const currencyFormatConfig: FormatNumberOptions = {
    currency: APP_CONFIG.CURRENCY_CODE,
    style: 'currency',
  }

  const numItems = _cart.items?.reduce((acc, cur) => acc + cur.quantity, 0)

  return (
    <Box>
      <Stack spacing={{ base: 0, md: 3 }}>
        {showTitle && (
          <Text textStyle={'Desktop/M'} mb={2}>
            {intl.formatMessage({ id: 'cart.summary.title' })}
          </Text>
        )}

        <Accordion
          allowToggle
          defaultIndex={[0]}
          mt="0 !important"
          {...itemsBoxProps}
        >
          <AccordionItem borderTop={0}>
            <AccordionButton px={0} borderBottomWidth={1}>
              <Text
                flex="1"
                textAlign="left"
                textStyle={'Desktop/Body-Default'}
              >
                {intl.formatMessage(
                  {
                    id:
                      (numItems ?? 0) > 1
                        ? 'checkout.orderSummary.items'
                        : 'checkout.orderSummary.item',
                  },
                  { quantity: _cart.quantity }
                )}{' '}
                <AccordionIcon />
              </Text>
              <Text fontWeight={700}>
                {intl.formatNumber(
                  parseFloat(_cart.summary?.subtotalPrice || '0'),
                  {
                    currency: APP_CONFIG.CURRENCY_CODE,
                    style: 'currency',
                  }
                )}
              </Text>
            </AccordionButton>
            <AccordionPanel px={0}>
              <Stack spacing="2" divider={<Divider />}>
                <ProductsList products={_cart.items} />
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <OrderTotals
          subtotal={intl.formatNumber(
            parseFloat(_cart?.summary?.subtotalPrice ?? '0'),
            currencyFormatConfig
          )}
          deliveryTitle={intl.formatMessage({
            id: 'cart.summary.shipping.complimentaryDelivery',
          })}
          delivery={intl.formatMessage({ id: 'cart.summary.shipping.free' })}
          tax={intl.formatNumber(
            parseFloat(_cart?.summary?.taxes ?? '0'),
            currencyFormatConfig
          )}
          priceBeforeDiscountTitle={intl.formatMessage({
            id: 'cart.summary.priceBeforeDiscount',
          })}
          priceBeforeDiscount={intl.formatNumber(
            parseFloat(_cart?.summary?.priceBeforeDiscount ?? '0'),
            currencyFormatConfig
          )}
          totalDiscountAmountTitle={intl.formatMessage({
            id: 'cart.summary.totalDiscountAmount',
          })}
          totalDiscountAmount={intl.formatNumber(
            parseFloat(_cart?.summary?.totalDiscountAmount ?? '0'),
            currencyFormatConfig
          )}
          totalTitle={intl.formatMessage({
            id: 'cart.summary.orderTotal',
          })}
          total={intl.formatNumber(
            parseFloat(_cart?.summary?.totalPrice ?? '0'),
            currencyFormatConfig
          )}
        />
      </Stack>
    </Box>
  )
}
