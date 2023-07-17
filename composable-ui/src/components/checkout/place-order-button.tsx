import { useCart, useCheckout, useToast } from '../../hooks'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Button, ButtonProps } from '@chakra-ui/react'

export const PlaceOrderButton = (props: ButtonProps) => {
  const intl = useIntl()
  const toast = useToast()
  const router = useRouter()
  const { placeOrder, isLoading } = useCheckout()
  const { deleteCart } = useCart()

  const handlePlaceOrder = async () => {
    try {
      const { redirectUrl } = await placeOrder()
      deleteCart()
      if (redirectUrl) {
        router.replace(redirectUrl)
      }
    } catch (e: unknown) {
      toast({
        status: 'error',
        description: (e as Error).message,
      })
    }
  }

  return (
    <Button
      fontSize="base"
      minW={'205px'}
      variant={'solid'}
      onClick={handlePlaceOrder}
      disabled={isLoading}
      isLoading={isLoading}
      {...props}
    >
      {intl.formatMessage({ id: 'action.placeOrder' })}
    </Button>
  )
}
