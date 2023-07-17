import { DM_Sans, Raleway } from '@next/font/google'

// Note: There is a bug with Chakra UI CLI for generating theme typings for autocomplete.
// When running `pnpm theme`, comment out the lines in the "Normal Usage" section below
// and uncomment the lines in the "For pnpm theme Usage" section.
// Source: https://github.com/chakra-ui/chakra-ui/issues/7157#issuecomment-1399243083

// For `pnpm theme` Usage:
// Uncomment the following line when running `pnpm theme`
// const raleway = null, dmSans = null

// Normal Usage below:
// Comment out the raleway and dmSans initializations below when running `pnpm theme`. After running `pnpm theme` be sure to uncomment these constants
const raleway = Raleway({
  subsets: ['latin'],
})
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})
// --- End of Normal Usage ---

export const availableFonts = {
  primary: raleway?.style?.fontFamily ?? 'Raleway',
  secondary: dmSans?.style?.fontFamily ?? 'DM Sans',
}

export const fonts = {
  heading: availableFonts.primary,
  body: availableFonts.primary,
  mono: availableFonts.primary,
  //https://nextjs.org/docs/basic-features/font-optimization
  Raleway: availableFonts.primary,
  'DM Sans': availableFonts.secondary,
}

export const fontSizes = {
  '4xl': '4.5rem', //72
  '3xl': '3.75rem', //60
  '2xl': '2.75rem', //44
  xxxxl: '4.5rem', //72
  xxxl: '3.75rem', //60
  xxl: '2.75rem', //44
  xl: '1.75rem', //28
  lg: '1.5rem', //24
  md: '1.25rem', //18
  base: '1rem', //16px
  default: '1rem', //16px
  sm: '0.875rem', //14px
  xs: '0.75rem', //12px
  xxs: '0.625rem', //10px
  '2xs': '0.625rem', //10px

  //chakra-ui default
  '5xl': '5rem',
  '6xl': '6rem',
  '7xl': '7rem',
  '8xl': '8rem',
  '9xl': '9rem',
}
export const fontWeights = {
  extraLight: 100,
  light: 200,
  normal: 400,
  bold: 800,

  //chakra-ui default
  hairline: 100,
  thin: 100,
  medium: 300,
  semibold: 500,
  extrabold: 700,
  black: 800,
}
export const letterSpacings = {
  extraTight: '-0.04em',
  tight: '-0.02em',
  normal: '0',
  relaxed: '0.02em',
  loose: '0.04em',
  extraLoose: '0.08em',

  //chakra-ui default
  tighter: '-0.05em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}
export const lineHeights = {
  none: 1,
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.5,
  loose: 2,

  //chakra-ui default
  base: 1.5, // 150%
  shorter: 1.25,
  short: 1.375,
  tall: 1.625,
  taller: 2,
  '3': '.75rem', //12px
  '4': '1rem', //16px
  '5': '1.25rem', //20
  '6': '1.5rem', //24
  '7': '1.75rem', //28
  '8': '2rem', //32
  '9': '2.25rem', //36
  '10': '2.5rem', //40
}

// Need to match with chakra-ui Theme Key
export const typography = {
  availableFonts,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
}
