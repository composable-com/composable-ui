import {
  Box,
  Grid,
  GridItem,
  Stack,
  StackDivider,
  Text,
  TextProps,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { SuccessSection } from './success-section'

export interface OrderDetailsProps {
  confirmationEmailAddress: string
  orderDate: string
  paymentMethod?: {
    line1: string
    line2?: string
  }
  deliveryMethod: {
    line1: string
    line2?: string
  }
  billing: {
    name: string
    addressLine1: string
    addressLine2?: string
  }
  shipping: {
    name: string
    addressLine1: string
    addressLine2?: string
  }
}

export const OrderDetails = ({
  confirmationEmailAddress,
  orderDate,
  paymentMethod,
  deliveryMethod,
  billing,
  shipping,
}: OrderDetailsProps) => {
  const intl = useIntl()

  return (
    <SuccessSection
      title={intl.formatMessage({ id: 'checkout.success.orderDetails.title' })}
    >
      <Stack spacing={4} divider={<StackDivider />}>
        <Stack spacing={4}>
          <InfoSection
            title={intl.formatMessage({
              id: 'checkout.success.orderDetails.confirmationEmail',
            })}
            content={[confirmationEmailAddress]}
          />
          <InfoSection
            title={intl.formatMessage({
              id: 'checkout.success.orderDetails.orderDate',
            })}
            content={[orderDate]}
          />
        </Stack>

        <Grid
          gridTemplateAreas={{
            base: `"paymentMethod" "billingAddress" "delivery" "shippingAddress"`,
            md: `"paymentMethod delivery" "billingAddress shippingAddress"`,
          }}
          gap={6}
        >
          <GridItem gridArea="paymentMethod">
            <InfoSection
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.paymentMethod',
              })}
              content={[paymentMethod?.line1 ?? '', paymentMethod?.line2 ?? '']}
              textTransform="capitalize"
            />
          </GridItem>
          <GridItem gridArea="billingAddress">
            <InfoSection
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.billingAddress',
              })}
              content={[
                billing.name,
                billing.addressLine1,
                billing.addressLine2 ?? '',
              ]}
            />
          </GridItem>
          <GridItem gridArea="delivery">
            <InfoSection
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.deliveryOption',
              })}
              content={[deliveryMethod.line1, deliveryMethod.line2 ?? '']}
            />
          </GridItem>
          <GridItem gridArea="shippingAddress">
            <InfoSection
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.shippingAddress',
              })}
              content={[
                shipping.name,
                shipping.addressLine1,
                shipping.addressLine2 ?? '',
              ]}
            />
          </GridItem>
        </Grid>
      </Stack>
    </SuccessSection>
  )
}

interface InfoSectionProps extends TextProps {
  title: string
  content: string[]
}

export const InfoSection = ({
  title,
  content,
  ...textProps
}: InfoSectionProps) => {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="extrabold" {...textProps}>
        {title}
      </Text>
      {content.map((c) => (
        <Text {...textProps} key={c} fontSize="sm">
          {c}
        </Text>
      ))}
    </Box>
  )
}
