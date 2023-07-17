import NextLink from 'next/link'
import Image from 'next/image'
import {
  AspectRatio,
  Box,
  Button,
  ButtonProps,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { Price } from './price'

export interface ProductCardProps {
  imageUrl?: string
  imageSizes?: string
  imagePriority?: boolean
  name?: string
  href?: string
  price?: string
  prefetch?: boolean
  button?: ButtonProps
}

export const ProductCard = ({
  imageUrl,
  imageSizes,
  imagePriority,
  name,
  href,
  price,
  prefetch = false,
  button,
}: ProductCardProps) => {
  return (
    <LinkBox
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      {imageUrl && (
        <AspectRatio
          ratio={1.8}
          position="relative"
          width="100%"
          overflow="hidden"
          mb={3}
        >
          <Image
            priority={imagePriority}
            src={imageUrl}
            alt={name ?? ''}
            fill
            sizes={imageSizes ?? '25vw'}
            style={{
              objectFit: 'cover',
            }}
          />
        </AspectRatio>
      )}

      <Box my={1}>
        <NextLink prefetch={prefetch} href={href ?? ''} legacyBehavior passHref>
          <LinkOverlay>{name}</LinkOverlay>
        </NextLink>
      </Box>

      <Price price={price} />

      {button?.children && <Button mt={3} size="sm" width="full" {...button} />}
    </LinkBox>
  )
}
