import { api } from '../../utils/api'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Box, Center, Container, Spinner, VStack } from '@chakra-ui/react'
import {
  OrderDetails,
  OrderItems,
  SuccessOrderSummary,
  ThankYou,
} from './success'
import { APP_CONFIG } from '../../utils/constants'
import { useSession } from 'next-auth/react'

export interface CheckoutSuccessPageProps {
  orderId: string
  paymentIntentId: string | null
}

export const CheckoutSuccessPage = ({
  orderId,
  paymentIntentId,
}: CheckoutSuccessPageProps) => {
  const session = useSession()
  const router = useRouter()
  const intl = useIntl()
  const {
    data: order,
    isLoading,
    isError,
  } = api.commerce.getOrder.useQuery(
    { orderId },
    {
      enabled: session.status === 'authenticated',
    }
  )
  const { data: stripe, isLoading: stripeIsLoading } =
    api.stripe.getPaymentIntent.useQuery(
      {
        paymentIntentId: paymentIntentId ?? '',
      },
      {
        enabled: session.status === 'authenticated',
      }
    )

  useEffect(() => {
    if (session.status === 'authenticated') {
      // wait until the session was authenticated, before determining whether to redirect
      if (order === null || isError) {
        router.replace('/')
      }
    }
  }, [order, isError, router, session])

  if (isLoading || stripeIsLoading) {
    return (
      <Center minHeight={96}>
        <Spinner />
      </Center>
    )
  }

  return (
    <Box bg="shading.100" pb={{ base: 'md', md: 'xxxl' }}>
      <Container maxW="container.lg" px={{ base: 0, md: 4 }}>
        <VStack spacing="md">
          <Box mt={{ base: 8, md: 135 }} mb={65}>
            <ThankYou
              orderId={orderId ?? ''}
              confirmationEmailAddress={order?.customer.email}
            />
          </Box>

          <OrderDetails
            confirmationEmailAddress={order?.customer.email ?? ''}
            orderDate={intl.formatDate(order?.created_at, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
            paymentMethod={
              !paymentIntentId
                ? {
                    line1: intl.formatMessage({
                      id: 'checkout.paymentSection.offlinePayment',
                    }),
                  }
                : stripeIsLoading
                ? { line1: '' }
                : {
                    line1: `${stripe?.card?.brand ?? 'XXXX'} XXXX-${
                      stripe?.card?.last4 ?? 'XXXX'
                    }`,
                    line2: intl.formatMessage(
                      {
                        id: 'checkout.success.orderDetails.paymentMethod.card.expiry',
                      },
                      {
                        date: `${stripe?.card?.exp_month ?? 'XX'}/${
                          stripe?.card?.exp_year ?? 'XXXX'
                        }`,
                      }
                    ),
                  }
            }
            deliveryMethod={{
              line1: intl.formatMessage(
                { id: 'checkout.success.orderDetails.deliver' },
                {
                  date: intl.formatDate(Date.now(), {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  }),
                }
              ),
              line2: order?.shipping_method.name
                ? `(${order?.shipping_method.name})`
                : '',
            }}
            billing={{
              name: order?.billing_address.full_name ?? '',
              addressLine1: order?.billing_address.address_line_1 ?? '',
              addressLine2: `${order?.billing_address?.city}, ${order?.billing_address?.state} ${order?.billing_address?.postcode}, ${order?.billing_address?.country}`,
            }}
            shipping={{
              name: order?.shipping_address.full_name ?? '',
              addressLine1: order?.shipping_address.address_line_1 ?? '',
              addressLine2: `${order?.shipping_address?.city}, ${order?.shipping_address?.state} ${order?.shipping_address?.postcode}, ${order?.shipping_address?.country}`,
            }}
          />

          <SuccessOrderSummary
            items={<OrderItems items={order?.items || []} />}
            itemsQuantity={order?.items.length ?? 0}
            subtotal={intl.formatNumber(
              parseFloat(order?.summary.subtotalPrice ?? '0'),
              {
                currency: APP_CONFIG.CURRENCY_CODE,
                style: 'currency',
              }
            )}
            deliveryTitle={intl.formatMessage({
              id: 'cart.summary.shipping.complimentaryDelivery',
            })}
            delivery={intl.formatMessage({ id: 'cart.summary.shipping.free' })}
            tax={intl.formatNumber(parseFloat(order?.summary.taxes ?? '0'), {
              currency: APP_CONFIG.CURRENCY_CODE,
              style: 'currency',
            })}
            priceBeforeDiscount={intl.formatNumber(
              parseFloat(order?.summary.priceBeforeDiscount || '0'),
              {
                currency: APP_CONFIG.CURRENCY_CODE,
                style: 'currency',
              }
            )}
            totalDiscountAmount={intl.formatNumber(
              parseFloat(order?.summary.totalDiscountAmount || '0'),
              {
                currency: APP_CONFIG.CURRENCY_CODE,
                style: 'currency',
              }
            )}
            total={intl.formatNumber(
              parseFloat(order?.summary.totalPrice ?? '0'),
              {
                currency: APP_CONFIG.CURRENCY_CODE,
                style: 'currency',
              }
            )}
          />
        </VStack>
      </Container>
    </Box>
  )
}
