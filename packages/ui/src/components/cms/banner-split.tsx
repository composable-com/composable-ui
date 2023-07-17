import { Box } from '@chakra-ui/react'
import { BannerImage, BannerImageProps } from './banner-image'
import { BannerText, BannerTextProps } from './banner-text'

export interface BannerSplitProps {
  image?: BannerImageProps
  text?: BannerTextProps
  inverted?: boolean
  isFullScreen?: boolean
  isLazy?: boolean
}

export const BannerSplit = ({
  text,
  image,
  inverted,
  isFullScreen,
  isLazy,
}: BannerSplitProps) => {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="stretch"
      minHeight={isFullScreen ? '88vh' : undefined}
    >
      <BannerImage
        root={{
          order: inverted ? { base: 0, md: 1 } : 0,
          width: ['100%', '100%', null, '50%'],
          height: ['30vh', '30vh', null, '700px'],
          ...image?.root,
        }}
        isSplit={true}
        isLazy={isLazy}
        {...image}
      />
      <BannerText
        root={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: ['20px', null, '40px'],
          py: ['20px', null, '40px'],
          order: inverted ? 0 : 1,
          width: ['100%', '100%', null, '50%'],
          ...text?.root,
        }}
        eyebrow={{
          textStyle: ['Mobile/Eyebrow', null, 'Desktop/Eyebrow'],
          textColor: ['text', null, 'text'],
          ...text?.eyebrow,
        }}
        title={{
          textStyle: ['Desktop/XL', null, 'Desktop/2XL'],
          textColor: ['text', null, 'text'],
          textAlign: ['center', 'center', null, 'start'],
          ...text?.title,
        }}
        body={{
          textStyle: ['Desktop/Body-Default', null, 'Desktop/Body-L'],
          textColor: ['text', null, 'text'],
          textAlign: ['center', 'center', null, 'start'],
          ...text?.body,
        }}
        ctaButtonPrimary={{
          variant: 'outline',
          width: ['100%', '100%', null, 'auto'],
          ...text?.ctaButtonPrimary,
        }}
      />
    </Box>
  )
}
