import { AspectRatio, Box, Text, VStack } from '@chakra-ui/react'
import { Price } from 'components/price'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { APP_CONFIG } from '../../utils/constants'

type BaseHit = Record<string, unknown>

export interface AlgoliaProduct extends BaseHit {
  sku: string
  slug: string
  name: string
  description: string
  brand: string
  price: string
  images: {
    url: string
    alt?: string
  }[]
}

interface CategoryProductCardProps {
  product: AlgoliaProduct
  priority?: boolean
}

export const CategoryProductCard: FunctionComponent<
  CategoryProductCardProps
> = ({ product, priority = false }) => {
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]?.url
      : APP_CONFIG.IMAGE_PLACEHOLDER
  const imageAlt = product.images[0]?.alt ?? product.name ?? ''

  return (
    <VStack as="article" w="100%" p={1} spacing="xs" alignItems="initial">
      <Link
        href={`/product/${product.slug}`}
        aria-label={product.name}
        passHref
      >
        <Box>
          <AspectRatio
            ratio={3 / 4}
            position="relative"
            width="100%"
            overflow="hidden"
            mb={3}
          >
            <Image
              priority={priority}
              src={imageUrl}
              alt={imageAlt}
              height={750}
              width={600}
              quality={75}
              placeholder={'empty'}
              sizes="
                (max-width: 320px) 80vw,
                (max-width: 768px) 30vw,
                (max-width: 1200px) 30vw,
                550px"
              style={{
                objectFit: 'cover',
              }}
            />
          </AspectRatio>
        </Box>
      </Link>
      <VStack spacing="xxxxs" alignItems="initial">
        <Text fontSize={{ base: 'xxs', lg: 'xs' }} color="text-muted">
          {product.brand}
        </Text>
        <Text fontSize="sm">{product.name}</Text>
        <Price
          price={product.price}
          rootProps={{ fontSize: { base: 'xs', lg: 'sm' } }}
        />
      </VStack>
    </VStack>
  )
}
