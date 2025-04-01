import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { Accordion, AlertBox, Gallery, PdpLayout } from '@composable/ui'
import { useEffect, useState } from 'react'
import { Box, Button, HStack, Text } from '@chakra-ui/react'

import { APP_CONFIG } from 'utils/constants'
import { api } from 'utils/api'
import { useCart, useToast, useWishlist } from 'hooks'
import { Price } from './price'
import { QuantityPicker } from './quantity-picker'
import { Breadcrumb } from './product'
import { pdpAccordionData } from './product/__data__/product-accordion-data'
import { useSession } from 'next-auth/react'

const DynamicNoMatchPage = dynamic(() =>
  import('./no-match-page').then((_module) => _module.NoMatchPage)
)

export const ProductPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const intl = useIntl()
  const toast = useToast()
  const { data: product, isLoading } = api.commerce.getProductBy.useQuery({
    slug: `${router.query.slug}`,
  })
  // const userId = session?.data?.id as string;
  const [userId, setUserId] = useState(session?.data?.id)
  const { addWishlistItem, wishlist } = useWishlist(userId, {
    onWishlistItemAddError: () => {
      toast({
        status: 'error',
        description: intl.formatMessage({
          id: 'app.failure',
        }),
      })
    },
    onWishlistItemAddSuccess: () => {
      toast({
        status: 'success',
        title: intl.formatMessage({ id: 'wishlist.title' }),
        description: intl.formatMessage(
          { id: 'wishlist.addSuccess' },
          { name: product?.name ?? '' }
        ),
      })
    },
  })

  // TODO: breadcrumb data should come from product
  const breadcrumb = [
    { href: '/', label: 'Home' },
    {
      href: `/category/${product?.category}`,
      label: product?.category ?? 'Category',
    },
    { href: '/', label: product?.type ?? 'Type' },
  ]
  const [quantity, setQuantity] = useState(1)
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
          { name: product?.name ?? '' }
        ),
      })
    },
  })

  const handleAddToCart = () => {
    if (!product?.id) {
      return
    }

    addCartItem.mutate({
      productId: product.id,
      quantity: quantity,
    })
  }

  const handleAddToWishlist = async () => {
    if (!product?.id) {
      return
    }
    try {
      await addWishlistItem({
        // wishlistId: wishlist.id,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        sku: product.sku,
        type: product.type,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
      })
    } catch (error) {
      console.error('Failed to add item to wishlist:', error)
      toast({
        status: 'error',
        description: intl.formatMessage({
          id: 'app.failure',
        }),
      })
    }
  }

  useEffect(() => {
    if (session?.user?.email) {
      setUserId(session?.user?.email)
    }
  }, [session])

  if (isLoading) {
    return null
  }

  if (!product) {
    return <DynamicNoMatchPage />
  }

  const phpAccordion = [
    {
      defaultOpen: false,
      label: 'Material & Care',
      content: product.materialAndCare,
      id: 'b3ac576d-c527-4818-9540-fbc3933b5fb7',
    },
    ...pdpAccordionData,
  ]

  return (
    <PdpLayout
      seo={<NextSeo title={product.name} description={product.description} />}
      brand={product.brand}
      breadcrumb={<Breadcrumb items={breadcrumb} />}
      title={product.name}
      description={product.description}
      isLoaded={!isLoading}
      sectionOrder={[
        'breadcrumb',
        'brand',
        'title',
        'price',
        'main',
        'description',
        'accordion',
      ]}
      stackProps={{
        direction: { base: 'column-reverse', lg: 'row-reverse' },
      }}
      mainStackProps={{
        position: 'sticky',
        height: 'fit-content',
        top: '12',
      }}
      price={<Price price={product.price.toString()} />}
      main={
        <>
          <HStack spacing={{ base: '4', md: '6' }} mt={4} align="flex-end">
            <Box width="150px">
              <QuantityPicker
                value={quantity}
                onChange={(val) => setQuantity(val)}
                min={1}
                max={30}
                buttonProps={{
                  size: 'sm',
                }}
              />
            </Box>
            <Box flex="1">
              <HStack spacing="4">
                <Button
                  size={'lg'}
                  width={'full'}
                  onClick={() => handleAddToCart()}
                  isLoading={addCartItem.isLoading}
                >
                  {intl.formatMessage({ id: 'action.addToCart' })}
                </Button>
                <Button
                  size={'lg'}
                  width={'full'}
                  variant="outline"
                  onClick={() => handleAddToWishlist()}
                  isDisabled={!product}
                >
                  {intl.formatMessage({ id: 'action.addToWishlist' })}
                </Button>
              </HStack>
            </Box>
          </HStack>
          <AlertBox
            rootProps={{
              borderRadius: '0.375rem',
              mt: '1.5rem',
            }}
            description={intl.formatMessage({
              id: 'product.shippingAndReturn.info',
            })}
          />
        </>
      }
      accordion={
        <Accordion
          size="medium"
          items={phpAccordion}
          accordionProps={{
            mt: 8,
            allowToggle: false,
            allowMultiple: true,
          }}
          accordionItemProps={{ border: 'none' }}
          accordionPanelProps={{ px: 0 }}
          accordionButtonProps={{
            px: 0,
            borderBottomWidth: '1px',
          }}
        />
      }
      aside={
        <Gallery
          key={product.id}
          rootProps={{
            borderWidth: '1px',
            borderColor: 'gray.200',
            overflow: 'hidden',
            width: '100%',
            borderRadius: 'base',
          }}
          images={
            product?.images?.length
              ? product.images.map((image, i) => {
                  return {
                    src: image.url,
                    alt: image.alt,
                    priority: i === 0,
                  }
                })
              : [{ src: APP_CONFIG.IMAGE_PLACEHOLDER, alt: '' }]
          }
        />
      }
    />
  )
}
