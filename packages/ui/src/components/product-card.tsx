import NextLink from 'next/link'
import Image from 'next/image'
import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'

export interface ProductCardProps {
  root?: Omit<BoxProps, 'children'>
  topLeft?: BoxProps
  image?: {
    src?: string
    alt?: string
    ratio?: number
  }
  brand?: BoxProps
  name?: BoxProps
  href?: string
  price?: BoxProps
  button?: ButtonProps
}

export const ProductCard = ({
  root,
  topLeft,
  image,
  brand,
  name,
  href,
  price,
  button,
}: ProductCardProps) => {
  return (
    <LinkBox
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      px={{ base: 4, md: 0 }}
      {...root}
    >
      {image?.src && (
        <AspectRatio
          ratio={image?.ratio ?? 1}
          position="relative"
          width="100%"
          overflow="hidden"
          mb={3}
        >
          <Image
            src={image.src ?? ''}
            alt={image?.alt ?? ''}
            fill
            style={{
              objectFit: 'contain',
            }}
            sizes={
              '(min-width: 1300px) 292px, (min-width: 1260px) calc(-350vw + 4772px), (min-width: 980px) calc(25.77vw + 42px), (min-width: 780px) calc(6.67vw + 298px), (min-width: 660px) calc(50vw - 72px), (min-width: 460px) 330px, (min-width: 380px) 76.67vw, calc(10vw + 228px)'
            }
          />
        </AspectRatio>
      )}
      {topLeft?.children && (
        <Box position="absolute" top="0" left="0" {...topLeft} />
      )}
      {brand?.children && (
        <Box
          textStyle={['Mobile/Body-XS', null, 'Desktop/Body-XS']}
          textColor="text-muted"
          {...brand}
        />
      )}
      {name?.children && (
        <Box
          textStyle={['Mobile/Body-Default', null, 'Desktop/Body-Default']}
          textColor="text"
          my={1}
        >
          <LinkOverlay as={NextLink} href={href ?? ''}>
            {name.children}
          </LinkOverlay>
        </Box>
      )}
      {price?.children && (
        <Box
          textStyle={['Mobile/Body-S', null, 'Desktop/Body-S']}
          textColor="text"
          {...price}
        />
      )}
      {button?.children && <Button mt={3} size="md" width="full" {...button} />}
    </LinkBox>
  )
}
