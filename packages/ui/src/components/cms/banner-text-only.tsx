import { Box } from '@chakra-ui/react'
import { BannerText, BannerTextProps } from './banner-text'

export interface BannerTextOnlyProps {
  centered?: boolean
  containerMinHeight?: string
  text?: BannerTextProps
  theme?: BannerTextOnlyTheme
}

type BannerTextOnlyTheme = 'dark' | 'light'

export const BannerTextOnly = ({
  text,
  centered,
  theme = 'light',
  containerMinHeight,
}: BannerTextOnlyProps) => {
  const background = backgroundValue[theme]
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="stretch"
      minHeight={containerMinHeight}
      backgroundColor={background}
    >
      <BannerText
        root={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: centered ? 'center' : undefined,
          textAlign: centered ? 'center' : undefined,
          px: ['20px', null, '40px'],
          py: ['20px', null, '40px'],
          width: '100%',
          ...text?.root,
        }}
        eyebrow={{
          textStyle: ['Mobile/Eyebrow', null, 'Desktop/Eyebrow'],
          textColor: ['text', null, 'text'],
          ...text?.eyebrow,
        }}
        title={{
          textStyle: ['Desktop/L', null, 'Desktop/XL'],
          textColor: ['text', null, 'text'],
          ...text?.title,
        }}
        body={{
          textStyle: ['Desktop/Body-Default', null, 'Desktop/Body-L'],
          textColor: ['text', null, 'text'],
          ...text?.body,
        }}
        ctaButtonPrimary={{
          variant: 'outline',
          ...text?.ctaButtonPrimary,
        }}
        ctaButtonBox={{
          justifyContent: centered ? 'center' : undefined,
          ...text?.ctaButtonBox,
        }}
      />
    </Box>
  )
}

const backgroundValue: Record<BannerTextOnlyTheme, string> = {
  light: 'primary.light',
  dark: 'primary',
}
