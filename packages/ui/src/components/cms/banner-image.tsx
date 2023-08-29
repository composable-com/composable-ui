import Image from 'next/image'
import { Box, BoxProps } from '@chakra-ui/react'

export interface BannerImageProps {
  root?: BoxProps
  imageBox?: BoxProps
  imageDesktop?: {
    src?: string
    alt?: string
  }
  imageMobile?: {
    src?: string
    alt?: string
  }
  isSplit?: boolean
  overlayBackground?: string | null
  isLazy?: boolean | null
}

const imageBase: BoxProps = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
}

export const BannerImage = ({
  imageDesktop,
  imageMobile,
  imageBox,
  overlayBackground,
  root,
  isLazy = true,
  isSplit = false,
}: BannerImageProps) => {
  if (!imageDesktop?.src && !imageMobile?.src) {
    return null
  }

  return (
    <Box display="flex" alignItems="stretch" {...root}>
      <Box display={['none', 'none', 'block']} {...imageBase} {...imageBox}>
        <Image
          fill
          src={imageDesktop?.src || imageMobile?.src || ''}
          alt={imageDesktop?.alt || imageMobile?.alt || ''}
          style={{ objectFit: 'cover' }}
          loading={isLazy ? 'lazy' : 'eager'}
          priority={!isLazy}
          sizes={
            isSplit
              ? '(min-width: 1360px) 624px, 45.71vw'
              : '(min-width: 1360px) 1216px, 91.43vw'
          }
        />
        {overlayBackground && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background={overlayBackground}
          />
        )}
      </Box>

      <Box display={['block', 'block', 'none']} {...imageBase} {...imageBox}>
        <Image
          fill
          src={imageMobile?.src || imageDesktop?.src || ''}
          alt={imageMobile?.alt || imageDesktop?.alt || ''}
          style={{ objectFit: 'cover' }}
          loading={isLazy ? 'lazy' : 'eager'}
          priority={!isLazy}
          sizes={'50vw'}
        />
        {overlayBackground && (
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            background={overlayBackground}
          />
        )}
      </Box>
    </Box>
  )
}
