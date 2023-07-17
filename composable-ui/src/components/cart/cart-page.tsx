import { FormatNumberOptions, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import {
  Box,
  Container,
  Divider,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

import { APP_CONFIG } from '../../utils/constants'
import { useCart, useToast } from 'hooks'
import { HorizontalProductCard } from '@composable/ui'
import { CartEmptyState, CartLoadingState, CartSummary, CartTotal } from '.'

export const CartPage = () => {
  const router = useRouter()
  const intl = useIntl()
  const toast = useToast()
  const { cart, updateCartItem, deleteCartItem } = useCart({
    onCartItemUpdateError: () => {
      toast({
        status: 'error',
        description: intl.formatMessage({ id: 'app.failure' }),
      })
    },
    onCartItemDeleteError: () => {
      toast({
        status: 'error',
        description: intl.formatMessage({ id: 'app.failure' }),
      })
    },
  })

  const { isLoading, isEmpty, quantity } = cart
  const title = intl.formatMessage({ id: 'cart.title' })
  const productCartSize: 'sm' | 'lg' | undefined = useBreakpointValue({
    base: 'sm',
    md: 'lg',
  })
  const currencyFormatConfig: FormatNumberOptions = {
    currency: APP_CONFIG.CURRENCY_CODE,
    style: 'currency',
  }

  return (
    <Container maxW="container.xl" py={{ base: '4', md: '8' }}>
      <NextSeo title={title} noindex nofollow />

      <Flex
        gap={{ base: '0.5rem', md: '0.625rem' }}
        mb={'1.5rem'}
        alignItems={'baseline'}
      >
        <Text
          textStyle={{ base: 'Mobile/L', md: 'Desktop/L' }}
          color={'shading.700'}
        >
          {title}
        </Text>
        <Text
          textStyle={{ base: 'Mobile/Body-L', md: 'Desktop/Body-XL' }}
          color={'text-muted'}
        >
          {intl.formatMessage(
            {
              id:
                quantity <= 1
                  ? 'cart.titleCount.singular'
                  : 'cart.titleCount.plural',
            },
            { count: quantity }
          )}
        </Text>
      </Flex>

      {isLoading && <CartLoadingState />}
      {!isLoading && isEmpty && <CartEmptyState />}
      {!isLoading && !isEmpty && (
        <>
          <Stack
            w={'full'}
            maxW={'full'}
            display={{ md: 'none' }}
            mb={'2.5rem'}
          >
            <CartTotal />
          </Stack>
          <Flex w="100%" direction={{ base: 'column', lg: 'row' }}>
            <Box w="100%">
              <Divider mb={'1.5rem'} display={{ base: 'none', lg: 'block' }} />
              <Stack
                width={'full'}
                maxW={'full'}
                spacing="8"
                divider={<Divider />}
                as="ul"
                role="list"
                listStyleType="none"
              >
                {cart?.items?.map((item) => {
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
                        size={productCartSize}
                        image={{
                          src: item.image.url,
                          alt: item.image.alt ?? item.name,
                          onClickImage: () =>
                            router.push(`/product/${item.slug}`),
                        }}
                        metaText={
                          productCartSize === 'lg'
                            ? intl.formatMessage({
                                id: 'text.finalSale',
                              })
                            : ''
                        }
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
                          addToWishlist:
                            productCartSize === 'lg'
                              ? ''
                              : intl.formatMessage({
                                  id: 'action.moveToWishlist',
                                }),
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
                <></> {/* for bottom divider */}
              </Stack>
            </Box>
            <Flex
              as={'aside'}
              justify={'flex-end'}
              w={{ base: 'full' }}
              maxW={{ base: 'full', md: '400px', xl: '450px' }}
              ml={{ base: 'auto', lg: '3rem' }}
            >
              <CartSummary />
            </Flex>
          </Flex>
        </>
      )}
    </Container>
  )
}
