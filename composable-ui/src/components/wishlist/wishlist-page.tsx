import { CopyIcon } from '@chakra-ui/icons'
import {
  Box,
  Container,
  Divider,
  Flex,
  IconButton,
  Input,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FormatNumberOptions, useIntl } from 'react-intl'

import type { WishlistItem } from '@composable/types'
import { HorizontalProductCard } from '@composable/ui'
import { useToast, useWishlist, useCart } from 'hooks'
import { useEffect, useState } from 'react'
import { APP_CONFIG } from '../../utils/constants'
import { WishlistEmptyState } from './wishlist-empty-state'
import { WishlistLoadingState } from './wishlist-loading-state'

export const WishlistPage = ({
  wishlistId,
  editable,
}: {
  wishlistId: string
  editable: boolean
}) => {
  const router = useRouter()
  const intl = useIntl()
  const toast = useToast()
  const { data: session } = useSession()
  const [shareUrl, setShareURL] = useState('')

  const { wishlist, removeWishlistItem, isLoading, isEmpty } = useWishlist(
    wishlistId,
    {
      onWishlistItemRemoveError: () => {
        toast({
          status: 'error',
          description: intl.formatMessage({ id: 'app.failure' }),
        })
      },
    }
  )

  const { addCartItem } = useCart({
    onCartItemAddError: () => {
      toast({
        status: 'error',
        description: intl.formatMessage({
          id: 'app.failure',
        }),
      })
    },
    onCartItemAddSuccess: () => {
      toast({
        status: 'success',
        title: intl.formatMessage({ id: 'cart.title' }),
        description: intl.formatMessage(
          { id: 'cart.item.add.success' },
          { name: '' }
        ),
      })
    },
  })

  const title = wishlist?.name || intl.formatMessage({ id: 'wishlist.title' })
  const productWishlistSize: 'sm' | 'lg' | undefined = useBreakpointValue({
    base: 'sm',
    md: 'lg',
  })
  const currencyFormatConfig: FormatNumberOptions = {
    currency: APP_CONFIG.CURRENCY_CODE,
    style: 'currency',
  }

  // const shareUrl =

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({
      status: 'success',
      description: intl.formatMessage({ id: 'wishlist.linkCopied' }),
    })
  }

  useEffect(() => {
    editable &&
      window &&
      setShareURL(`${window.location.origin}/wishlist/${wishlistId}`)
  }, [wishlist])

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
                (wishlist?.items?.length ?? 0) <= 1
                  ? 'wishlist.titleCount.singular'
                  : 'wishlist.titleCount.plural',
            },
            { count: wishlist?.items?.length || 0 }
          )}
        </Text>
      </Flex>

      {editable && (
        <Flex mb={4} gap={2}>
          <Input value={shareUrl} isReadOnly />
          <Tooltip label={intl.formatMessage({ id: 'wishlist.copyLink' })}>
            <IconButton
              aria-label="Copy link"
              icon={<CopyIcon />}
              onClick={copyToClipboard}
            />
          </Tooltip>
        </Flex>
      )}
      {isLoading && <WishlistLoadingState />}
      {!isLoading && isEmpty && <WishlistEmptyState />}
      {!isLoading && !isEmpty && (
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
            {wishlist?.items?.map((item: WishlistItem) => {
              return (
                <Box key={item.id} as="li">
                  <HorizontalProductCard
                    key={item.id}
                    brand={item.brand}
                    columns={4}
                    editable={editable}
                    details={[
                      { name: 'SKU', value: item.sku, id: item.id },
                      { name: 'Type', value: item.type, id: item.id },
                    ]}
                    size={productWishlistSize}
                    image={{
                      src: item.image.url,
                      alt: item.image.alt ?? item.name,
                      onClickImage: () => router.push(`/product/${item.slug}`),
                    }}
                    name={item.name || ''}
                    labels={{
                      quantity: intl.formatMessage({
                        id: 'wishlist.item.quantity',
                      }),
                      itemPrice: intl.formatMessage({
                        id: 'wishlist.item.price',
                      }),
                      totalPrice: intl.formatMessage({
                        id: 'wishlist.item.totalPrice',
                      }),
                      remove: intl.formatMessage({ id: 'action.remove' }),
                      addToWishlist: intl.formatMessage({
                        id: 'action.addToCart',
                      }),
                    }}
                    quantity={1}
                    regularPrice={intl.formatNumber(
                      item.price,
                      currencyFormatConfig
                    )}
                    onAddToWishlist={() => {
                      addCartItem.mutate({
                        productId: item.id,
                        quantity: 1,
                      })
                      if (editable) {
                        removeWishlistItem({
                          userId: session?.user?.email || '',
                          itemId: item.id,
                        })
                      }
                    }}
                    onRemove={
                      editable
                        ? () => {
                            removeWishlistItem({
                              userId: session?.user?.email || '',
                              itemId: item.id,
                            })
                          }
                        : undefined
                    }
                    onChangeQuantity={editable ? () => null : undefined}
                    isLoading={false}
                  />
                </Box>
              )
            })}
            <></> {/* for bottom divider */}
          </Stack>
        </Box>
      )}
    </Container>
  )
}
