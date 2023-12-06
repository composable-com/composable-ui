import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { useComposable, useCart, useToast } from 'hooks'
import {
  Box,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
} from '@chakra-ui/react'
import { APP_CONFIG } from '../../../utils/constants'
import { CartLoadingState } from '../.'
import { CartDrawerFooter } from './cart-drawer-footer'
import { CartDrawerSummary } from './cart-drawer-summary'
import { CartDrawerEmptyState } from './cart-drawer-empty-state'
import { HorizontalProductCard } from '@composable/ui'

export const CartDrawer = () => {
  const intl = useIntl()
  const toast = useToast()
  const router = useRouter()
  const { cartDrawer } = useComposable()

  const { cart, deleteCartItem, updateCartItem } = useCart({
    onCartItemDeleteError: () => {
      toast({
        status: 'error',
        description: intl.formatMessage({ id: 'app.failure' }),
      })
    },
  })

  const title = intl.formatMessage(
    { id: 'cart.drawer.titleCount' },
    { count: cart.quantity }
  )
  const currencyFormatConfig: FormatNumberOptions = {
    currency: APP_CONFIG.CURRENCY_CODE,
    style: 'currency',
  }

  useEffect(() => {
    router.events.on('routeChangeStart', cartDrawer.onClose)
    return () => {
      router.events.off('routeChangeStart', cartDrawer.onClose)
    }
  }, [router, cartDrawer.onClose])

  return (
    <Drawer isOpen placement="right" size={'md'} onClose={cartDrawer.onClose}>
      <DrawerOverlay />
      <DrawerContent maxW={{ base: 375, md: 550 }}>
        <DrawerHeader
          maxH={{ base: 50, md: 60 }}
          p={{ base: '18px 36px 14px', md: '20px 36px 16px' }}
        >
          <DrawerCloseButton
            size={'lg'}
            fontSize={'xs'}
            left={'xs'}
            mt={{ base: '2px', md: '5px' }}
          />
          <Center
            h={'24px'}
            fontSize={{ base: '1rem', md: '1.25rem' }}
            lineHeight={'1.5rem'}
          >
            <Text textStyle={'Desktop/Default'} fontWeight={800}>
              {title}
            </Text>
          </Center>
        </DrawerHeader>
        <Divider mb={'1em'} />
        <DrawerBody>
          {cart.isLoading ? (
            <CartLoadingState />
          ) : cart.isEmpty ? (
            <CartDrawerEmptyState onClose={cartDrawer.onClose} />
          ) : (
            <Stack spacing="4">
              <Stack
                spacing="8"
                divider={<Divider />}
                as="ul"
                role="list"
                listStyleType="none"
              >
                {cart.items?.map((item) => {
                  return (
                    <Box key={item.id} as="li">
                      <HorizontalProductCard
                        key={item.id}
                        brand={item.brand}
                        columns={4}
                        editable
                        details={[
                          { name: 'SKU', value: item.sku, id: item.id },
                          { name: 'Type', value: item.type, id: item.id },
                        ]}
                        size={'sm'}
                        image={{
                          src: item.image.url,
                          alt: item.image.alt ?? item.name,
                          onClickImage: () =>
                            router.push(`/product/${item.slug}`),
                        }}
                        name={item.name || ''}
                        labels={{
                          quantity: intl.formatMessage({
                            id: 'cart.item.quantity',
                          }),
                          itemPrice: intl.formatMessage({
                            id: 'cart.item.price',
                          }),
                          totalPrice: intl.formatMessage({
                            id: 'cart.item.totalPrice',
                          }),
                          remove: intl.formatMessage({ id: 'action.remove' }),
                        }}
                        quantity={item.quantity}
                        regularPrice={intl.formatNumber(
                          item.price,
                          currencyFormatConfig
                        )}
                        onAddToWishlist={() => null}
                        onRemove={() => {
                          deleteCartItem.mutate({ itemId: item.id })
                        }}
                        onChangeQuantity={(val) => {
                          updateCartItem.mutate({
                            quantity: val,
                            itemId: item.id,
                          })
                        }}
                        isLoading={
                          updateCartItem.isLoading || deleteCartItem.isLoading
                        }
                      />
                    </Box>
                  )
                })}
              </Stack>
              <CartDrawerSummary />
            </Stack>
          )}
        </DrawerBody>
        <DrawerFooter boxShadow={'0px -2px 4px rgba(0, 0, 0, 0.1)'}>
          {!cart.isLoading && !cart.isEmpty && <CartDrawerFooter />}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
