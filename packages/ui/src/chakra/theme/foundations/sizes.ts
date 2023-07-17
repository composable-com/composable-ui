import { spacing } from './spacing'
import { breakpoints } from './breakpoints'

export const largeSizes = {
  // chakra default
  max: 'max-content',
  min: 'min-content',
  full: '100%',
  '3xs': '14rem',
  '2xs': '16rem',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
  '8xl': '90rem',
}

const container = {
  xs: breakpoints.xs, // 320px
  sm: breakpoints.sm, // 640px
  md: breakpoints.md, // 768px
  lg: breakpoints.lg, // 1024px
  xl: breakpoints.xl, // 1280px
  '2xl': breakpoints['2xl'], // 1536px
  full: '100%',
}

export const sizes = {
  ...spacing,
  ...largeSizes,
  container,
}
