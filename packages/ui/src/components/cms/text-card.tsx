import Image from 'next/image'
import NextLink from 'next/link'
import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  ButtonProps,
} from '@chakra-ui/react'

export interface TextCardProps {
  root?: Omit<BoxProps, 'children'>
  theme?: TextCardTheme
  title?: BoxProps
  description?: BoxProps
  button?: ButtonProps & { href?: string }
  image?: {
    src?: string
    alt?: string
  }
  textAlign?: TextCardTextAlign
}

export type TextCardTextAlign = 'left' | 'center' | 'right'
export type TextCardTheme = 'dark' | 'light' | 'highlight'

export const TextCard = ({
  theme = 'dark',
  textAlign = 'center',
  image,
  description,
  title,
  button,
  root,
}: TextCardProps) => {
  const alignItems = alignItemsValue[textAlign]

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      layerStyle={theme}
      alignItems={alignItems}
      textAlign={textAlign}
      px={6}
      py={theme === 'light' ? 2 : 10}
      {...root}
    >
      {image?.src && (
        <Box mb={6}>
          <AspectRatio
            ratio={1}
            position="relative"
            width="50px"
            overflow="hidden"
            mb={3}
          >
            <Image src={image.src} alt={image?.alt ?? ''} fill />
          </AspectRatio>
        </Box>
      )}

      {title?.children && (
        <Box
          textStyle={['Desktop/Default', null, 'Desktop/M']}
          my={2}
          {...title}
        />
      )}

      {description?.children && (
        <Box textStyle="Desktop/Body-Default" my={2} {...description} />
      )}

      {button?.children && !button?.href && (
        <Button
          layerStyle={theme}
          variant="ghost"
          flexGrow={0}
          mt={6}
          {...button}
        />
      )}

      {button?.children && button?.href && (
        <Button
          as={NextLink}
          href={button.href ?? ''}
          layerStyle={theme}
          variant="ghost"
          flexGrow={0}
          mt={6}
          px={textAlign !== 'center' ? 0 : undefined}
          _hover={{
            bg: 'none',
          }}
          _active={{
            bg: 'none',
          }}
          {...button}
        />
      )}
    </Box>
  )
}

const alignItemsValue: Record<TextCardTextAlign, ButtonProps['alignItems']> = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
}
