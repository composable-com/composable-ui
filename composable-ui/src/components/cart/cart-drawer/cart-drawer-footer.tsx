import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useComposable, useCart } from 'hooks'
import { Price } from 'components/price'
import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

export const CartDrawerFooter = () => {
  const router = useRouter()
  const { cartDrawer } = useComposable()
  const { cart } = useCart()
  const intl = useIntl()

  return (
    <Stack spacing="6" width="full">
      <Flex justify="space-between" align="center" wrap="wrap">
        <VStack align="left" spacing="0">
          <Box>
            <Text
              color={'text-muted'}
              textStyle={{ base: 'Mobile/Eyebrow', md: 'Desktop/Body-XS' }}
            >
              {intl.formatMessage({ id: 'cart.summary.orderTotal' })}
            </Text>
          </Box>
          <Box>
            <Price
              rootProps={{ textStyle: { base: 'Mobile/XS', md: 'Desktop/M' } }}
              price={cart.summary?.totalPrice ?? ''}
            />
          </Box>
        </VStack>
        <HStack flexGrow={1} justifyContent={'flex-end'}>
          <Button
            onClick={() => {
              router.push('/cart').then(() => {
                cartDrawer.onClose()
              })
            }}
            variant={'outline'}
            size={{ base: 'sm', md: 'lg' }}
          >
            {intl.formatMessage({ id: 'action.viewCart' })}
          </Button>
          <Button
            onClick={async () => {
              await router.push('/checkout')
              cartDrawer.onClose()
            }}
            variant={'solid'}
            size={{ base: 'sm', md: 'lg' }}
          >
            {intl.formatMessage({ id: 'action.checkout' })}
          </Button>
        </HStack>
      </Flex>
    </Stack>
  )
}
