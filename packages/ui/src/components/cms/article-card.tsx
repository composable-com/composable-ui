import NextLink from 'next/link'
import Image from 'next/image'
import {
  AspectRatio,
  Box,
  BoxProps,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'

export interface ArticleCardProps {
  root?: Omit<BoxProps, 'children'>
  textAlign?: ArticleCardTextAlign
  image?: {
    src?: string
    alt?: string
    ratio?: number
  }
  eyebrow?: BoxProps
  title?: BoxProps
  description?: BoxProps
  href?: string
}

export type ArticleCardTextAlign = 'left' | 'center' | 'right'

export const ArticleCard = ({
  textAlign = 'left',
  root,
  image,
  eyebrow,
  title,
  description,
  href,
}: ArticleCardProps) => {
  return (
    <LinkBox
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
      textAlign={textAlign}
      {...root}
    >
      {image?.src && (
        <AspectRatio
          ratio={image?.ratio ?? 1.25}
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
              objectFit: 'cover',
            }}
          />
        </AspectRatio>
      )}
      {eyebrow?.children && (
        <Box
          textStyle={['Mobile/Eyebrow', null, 'Desktop/Eyebrow']}
          textColor={['text-muted', null, 'text-muted']}
          maxWidth={['unset', null, 'unset']}
          {...eyebrow}
        />
      )}
      {title?.children && (
        <Box
          flexGrow={1}
          textStyle={['Mobile/XS', null, 'Desktop/XS']}
          textColor={['text', null, 'text']}
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
          textColor={['text']}
          {...description}
        />
      )}
    </LinkBox>
  )
}
