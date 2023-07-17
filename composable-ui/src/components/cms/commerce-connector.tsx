import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { ProductCard } from '@composable/ui'
import { useRouter } from 'next/router'

export interface GenericConnectorProps {
  sectionTitle?: string
  ctaLabel?: string
  ctaHref?: string
  ctaHeight?: string
  ctaMaxWidth?: string
  ctaMinWidth?: string
  products?: {
    name: string
    slug: string
    brand?: string
    img?: {
      url?: string
      alt?: string
    }
    price?: PriceProps
  }[]
}

export interface PriceProps {
  current: number
  currentFormatted: string
  regular?: number
  regularFormatted?: string
}

export const CommerceConnector = (props: GenericConnectorProps) => {
  const {
    sectionTitle,
    ctaLabel,
    ctaHref,
    products,
    ctaHeight,
    ctaMaxWidth,
    ctaMinWidth,
  } = props
  const router = useRouter()

  if (!products) return null

  return (
    <>
      <Container maxW="container.xl">
        <Flex
          gap={{ base: '0.5rem', md: '0.625rem' }}
          mb={{
            base: sectionTitle && ctaHref ? '8' : undefined,
            md: sectionTitle && ctaHref ? '12' : undefined,
          }}
          justifyContent={'space-between'}
        >
          <Text
            alignSelf={'flex-end'}
            textStyle={{ base: 'Body-L', md: 'Body-XL' }}
            color={'primary'}
          >
            {sectionTitle}
          </Text>
          {ctaLabel && ctaHref && (
            <Button onClick={() => router.push(ctaHref)}>{ctaLabel}</Button>
          )}
        </Flex>

        <Flex
          alignItems={'baseline'}
          wrap={'wrap'}
          justifyContent={'space-evenly'}
          gap={4}
        >
          {products?.map((product, idx: number) => (
            <ProductCard
              key={`${product.slug}-${idx}`}
              brand={{
                children: <Text>{product.brand}</Text>,
              }}
              name={{
                children: (
                  <Text textStyle={'Desktop/Body-S'} lineHeight={'4'}>
                    {product.name}
                  </Text>
                ),
              }}
              image={{
                src: product.img?.url || '',
                alt: product.img?.alt,
                ratio: 3 / 4,
              }}
              href={`product/${product.slug}`}
              price={{
                children: product.price && <Price {...product.price} />,
              }}
              root={{
                minWidth: ctaMinWidth || '150px',
                maxWidth: ctaMaxWidth || '200px',
                ...(ctaHeight && { height: ctaHeight }),
                flex: 1,
              }}
            />
          ))}
        </Flex>
      </Container>
    </>
  )
}

const Price = (props: PriceProps) => {
  const { regular = 0, current, currentFormatted, regularFormatted } = props
  const hasSpecialPrice = Boolean(current < regular)

  if (!regular && !current) {
    return null
  }

  return (
    <HStack spacing="1">
      <Text
        as="span"
        textStyle={'Body-S'}
        color={'text'}
        textDecoration={hasSpecialPrice ? 'line-through' : 'none'}
      >
        {hasSpecialPrice ? regularFormatted : currentFormatted}
      </Text>

      {hasSpecialPrice && (
        <Text as="span" textStyle={'Body-S'} color="danger.500">
          {currentFormatted}
        </Text>
      )}
    </HStack>
  )
}
