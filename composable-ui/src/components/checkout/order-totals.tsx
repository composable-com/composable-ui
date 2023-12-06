import { Divider, Flex, Stack, Text, TextProps } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface OrderTotalsProps {
  subtotal: string
  deliveryTitle?: string
  delivery: string
  tax: string
  discount?: string
  priceBeforeDiscountTitle?: string
  priceBeforeDiscount: string
  totalDiscountAmountTitle?: string
  totalDiscountAmount?: string
  totalTitle?: string
  total?: string
}

export const OrderTotals = ({
  subtotal,
  deliveryTitle,
  delivery,
  tax,
  priceBeforeDiscountTitle,
  priceBeforeDiscount,
  totalDiscountAmountTitle,
  totalDiscountAmount,
  totalTitle,
  total,
}: OrderTotalsProps) => {
  const intl = useIntl()

  return (
    <Stack spacing="xs" divider={<Divider />} px={{ base: 4, md: 'none' }}>
      <Stack spacing="xxxs">
        <CartSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
          value={subtotal}
        />
        <CartSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.tax' })}
          value={tax}
        />
        <CartSummaryItem
          label={
            deliveryTitle ||
            intl.formatMessage({
              id: 'cart.summary.shipping',
            })
          }
          value={delivery}
        />
        <Divider />
        <CartSummaryItem
          label={priceBeforeDiscountTitle ?? ''}
          value={priceBeforeDiscount}
        />
        {totalDiscountAmount && (
          <CartSummaryItem
            label={totalDiscountAmountTitle ?? ''}
            value={totalDiscountAmount}
            textProps={{ color: 'green' }}
            isDiscount
          />
        )}
        <Divider />
        {total && (
          <CartSummaryItem
            label={totalTitle ?? ''}
            value={total}
            textProps={{
              fontSize: 'base',
              fontWeight: 'extrabold',
            }}
          />
        )}
      </Stack>
    </Stack>
  )
}

interface CartSummaryItemProps {
  label: string
  value: string
  isDiscount?: boolean
  textProps?: TextProps
}

const CartSummaryItem = (props: CartSummaryItemProps) => {
  const { label, value, isDiscount, textProps } = props
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text {...textProps}>{label}</Text>
      <Text
        {...textProps}
        color={isDiscount ? textProps?.color ?? 'red' : undefined}
      >
        {isDiscount && '-'}
        {value}
      </Text>
    </Flex>
  )
}
