import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  Stack,
  Text,
} from '@chakra-ui/react'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { Section } from '@composable/ui'
import { CartEmptyState, CartLoadingState } from '../cart'
import { useCart, useCheckout } from '../../hooks'
import { APP_CONFIG } from '../../utils/constants'
import { OrderTotals } from './order-totals'
import { ProductsList } from './products-list'

interface BagSummaryMobileProps {
  accordionProps?: AccordionProps
}

export const BagSummaryMobile = ({ accordionProps }: BagSummaryMobileProps) => {
  const intl = useIntl()
  const { cart } = useCart()
  const { cartSnapshot } = useCheckout()
  const _cart = cart.isEmpty ? cartSnapshot : cart

  const currencyFormatConfig: FormatNumberOptions = {
    currency: APP_CONFIG.CURRENCY_CODE,
    style: 'currency',
  }

  return (
    <Accordion allowToggle bg={'white'} mb={4} {...accordionProps}>
      <AccordionItem>
        <AccordionButton bg={'white'} _hover={{ bg: 'white' }}>
          <Text flex="1" textAlign="left" textStyle="Desktop/Body-S">
            {intl.formatMessage(
              {
                id: _cart?.quantity
                  ? 'cart.drawer.titleCount'
                  : 'cart.drawer.title',
              },
              { count: _cart?.quantity }
            )}{' '}
            <AccordionIcon />
          </Text>
          <Text textStyle={'Desktop/S'}>
            {intl.formatNumber(
              parseFloat(_cart?.summary?.totalPrice || '0'),
              currencyFormatConfig
            )}
          </Text>
        </AccordionButton>
        <AccordionPanel p={'0'}>
          {_cart?.isLoading ? (
            <CartLoadingState />
          ) : _cart?.isEmpty ? (
            <CartEmptyState />
          ) : (
            <Section
              boxProps={{
                padding: { base: '0.6rem 1.5rem' },
              }}
            >
              <Stack spacing="2" borderBottomWidth={1}>
                <ProductsList products={_cart?.items} />
              </Stack>

              <OrderTotals
                subtotal={intl.formatNumber(
                  parseFloat(_cart?.summary?.subtotalPrice ?? '0'),
                  currencyFormatConfig
                )}
                deliveryTitle={intl.formatMessage({
                  id: 'cart.summary.shipping.complimentaryDelivery',
                })}
                delivery={intl.formatMessage({
                  id: 'cart.summary.shipping.free',
                })}
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
                  id: 'checkout.orderSummary.orderTotal',
                })}
                total={intl.formatNumber(
                  parseFloat(_cart?.summary?.totalPrice ?? '0'),
                  currencyFormatConfig
                )}
              />
            </Section>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
