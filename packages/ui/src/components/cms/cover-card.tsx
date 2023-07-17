import { Box, BoxProps, LinkOverlay } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export interface CoverCardProps {
  theme?: CoverCardTheme
  textAlign?: CoverCardTextAlign
  root?: Omit<BoxProps, 'children'>
  image?: {
    src?: string
    alt?: string
    height?: number
  }
  eyebrow?: BoxProps
  title?: BoxProps
  description?: BoxProps
  href?: string
  overlayBackground?: string
}

export type CoverCardTheme = 'light' | 'dark'
export type CoverCardTextAlign = 'left' | 'center' | 'right'

export const CoverCard = ({
  theme = 'dark',
  textAlign = 'left',
  root,
  image,
  eyebrow,
  title,
  description,
  href,
  overlayBackground = overlayBackgroundValue[theme],
}: CoverCardProps) => {
  const minHeight: BoxProps['minHeight'] = root?.minHeight ?? [
    '280px',
    null,
    '428px',
  ]

  return (
    <Box
      minHeight={minHeight}
      position="relative"
      p={{ base: 2, md: 6 }}
      {...root}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height={`${image?.height || '100'}%`}
      >
        {image?.src && (
          <Image
            fill
            src={image.src ?? ''}
            alt={image?.alt ?? ''}
            style={{
              objectFit: 'cover',
            }}
          />
        )}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background={overlayBackground}
        />
      </Box>

      <Box
        position="relative"
        display="initial"
        flexDirection="column"
        justifyContent="end"
        alignItems="stretch"
        textAlign={textAlign}
        minHeight={minHeight}
        px={[4, null, 5]}
        py={[6, null, 10]}
      >
        {eyebrow?.children && (
          <Box
            textStyle={['Mobile/Eyebrow', null, 'Desktop/Eyebrow']}
            layerStyle={`${theme}-text`}
            maxWidth={['unset', null, 'unset']}
            {...eyebrow}
          />
        )}
        {title?.children && (
          <Box
            textStyle={['Mobile/S', null, 'Desktop/S']}
            layerStyle={`${theme}-text`}
            my={1}
          >
            <NextLink href={href ?? ''} passHref>
              <LinkOverlay>{title.children}</LinkOverlay>
            </NextLink>
          </Box>
        )}
        {description?.children && (
          <Box
            textStyle={['Mobile/Body-Default', null, 'Desktop/Body-Default']}
            layerStyle={`${theme}-text`}
            {...description}
          />
        )}
      </Box>
    </Box>
  )
}

const overlayBackgroundValue: Record<CoverCardTheme, string> = {
  dark: 'rgba(0, 0, 0, 0.5)',
  light: 'rgba(255, 255, 255, 0.5)',
}
