import { Box, BoxProps } from '@chakra-ui/react'
import { BannerImage, BannerImageProps } from './banner-image'
import { BannerText, BannerTextProps } from './banner-text'

export interface BannerFullProps {
  image?: BannerImageProps
  overlayBackground?: string | null
  text?: BannerTextProps
  textPosition?: BannerFullTextPosition
  theme?: BannerFullTheme
}

type BannerFullTextPosition = 'left' | 'center' | 'right'
type BannerFullTheme = 'dark' | 'light'

export const BannerFull = ({
  text,
  image,
  textPosition = 'center',
  theme = 'dark',
  overlayBackground = overlayBackgroundValue[theme],
}: BannerFullProps) => {
  const textPositionProps = getTextPositionProps()

  return (
    <Box
      position="relative"
      display="flex"
      flexWrap="wrap"
      alignItems="stretch"
      minHeight={['500px', null, null, '650px']}
    >
      <BannerImage
        root={{
          pointerEvents: 'none',
          ...image?.root,
          ...parentSizeProps,
        }}
        imageBox={{
          ...image?.imageBox,
          ...parentSizeProps,
        }}
        overlayBackground={overlayBackground}
        {...image}
      />
      <BannerText
        root={{
          p: [6, null, 16],
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          ...text?.root,
          ...textPositionProps[textPosition],
        }}
        eyebrow={{
          textStyle: ['Desktop/Eyebrow'],
          textColor: theme === 'dark' ? ['text'] : ['background'],
          ml: textPosition === 'center' ? 'auto' : undefined,
          mr: textPosition === 'center' ? 'auto' : undefined,
          ...text?.eyebrow,
        }}
        title={{
          textStyle: ['Desktop/XL', null, 'Desktop/XL', null, 'Desktop/2XL'],
          textColor:
            theme === 'dark'
              ? ['text', null, 'text', null, 'text']
              : ['background', null, 'background', null, 'background'],
          ...text?.title,
        }}
        body={{
          textStyle: ['Desktop/Body-L', null, 'Desktop/Body-XL'],
          textColor:
            theme === 'dark'
              ? ['text', null, 'text', null, 'text']
              : ['background', null, 'background', null, 'background'],

          ...text?.body,
        }}
        ctaButtonBox={{
          justifyContent: textPosition === 'center' ? 'center' : undefined,
          ...text?.ctaButtonBox,
        }}
        ctaButtonPrimary={{
          variant: theme === 'dark' ? 'solid' : 'solid-alt',
          ...text?.ctaButtonPrimary,
        }}
        ctaButtonSecondary={{
          variant: theme === 'dark' ? 'outline' : 'outline-alt',
          ...text?.ctaButtonSecondary,
        }}
        ctaLinkBox={{
          justifyContent: textPosition === 'center' ? 'center' : undefined,
          ...text?.ctaButtonBox,
        }}
        ctaLinkItems={text?.ctaLinkItems?.map((el) => {
          return {
            variant: theme === 'dark' ? 'outline' : 'outline-alt',
            ...text?.ctaButtonSecondary,
            ...el,
          }
        })}
      />
    </Box>
  )
}

const parentSizeProps: BoxProps = {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
}

const getTextPositionProps = (): Record<BannerFullTextPosition, BoxProps> => {
  return {
    left: {
      width: ['100%', '100%', '50%'],
    },
    center: {
      width: ['100%', '100%', '75%'],
      margin: '0 auto',
      textAlign: 'center',
    },
    right: {
      width: ['100%', '100%', '50%'],
      marginLeft: ['auto', 'auto', '50%'],
    },
  }
}

const overlayBackgroundValue: Record<BannerFullTheme, string> = {
  light: 'rgba(0, 0, 0, 0.4)',
  dark: 'rgba(255, 255, 255, 0.2)',
}
