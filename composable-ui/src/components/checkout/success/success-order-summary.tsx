import { Box, Divider, Stack, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { SuccessSection } from './success-section'
import { OrderTotals } from '../order-totals'
import { ReactNode } from 'react'

interface OrderSummaryProps {
  items: ReactNode | ReactNode[]
  itemsQuantity: number
  subtotal: string
  deliveryTitle?: string
  delivery: string
  tax: string
  discount?: string
  total: string
}

export const SuccessOrderSummary = ({
  items,
  itemsQuantity,
  subtotal,
  deliveryTitle,
  delivery,
  tax,
  discount,
  total,
}: OrderSummaryProps) => {
  const intl = useIntl()

  return (
    <SuccessSection
      title={intl.formatMessage({ id: 'checkout.success.orderSummary.title' })}
    >
      <Stack divider={<Divider />} spacing={2}>
        <Text>
          {intl.formatMessage(
            {
              id:
                itemsQuantity > 1
                  ? 'checkout.orderSummary.items'
                  : 'checkout.orderSummary.item',
            },
            { quantity: itemsQuantity }
          )}
        </Text>
        <Box>
          <Stack divider={<Divider />} spacing={2}>
            {items}
          </Stack>
        </Box>
      </Stack>

      <OrderTotals
        subtotal={subtotal}
        deliveryTitle={deliveryTitle}
        delivery={delivery}
        tax={tax}
        discount={discount}
        totalTitle={intl.formatMessage({
          id: 'checkout.success.orderSummary.totalPaid',
        })}
        total={total}
      />
    </SuccessSection>
  )
}
