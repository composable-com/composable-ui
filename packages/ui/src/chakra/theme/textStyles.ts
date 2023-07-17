import {
  availableFonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  lineHeights,
} from './foundations/typography'

import { palette } from './foundations/colors'
import { spacing as space } from './foundations/spacing'
import { borderStyles } from './foundations/borderStyles'

// For key/props ref: https://chakra-ui.com/docs/styled-system/style-props
const variants = {
  blockQuote: {
    fontFamily: availableFonts.primary,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.relaxed,
    borderLeft: `${space.xxxs} ${borderStyles.normal} ${palette.primary[900]}`,
    marginLeft: space.sm,
    padding: `0 ${space.sm}`,
    color: palette.shading[600],
    fontSize: fontSizes.lg,
    fontStyle: 'italic',
  },
  body: {
    fontFamily: availableFonts.primary,
    fontSize: fontSizes.base,
    fontWeight: fontWeights.normal,
    lineHeight: lineHeights.normal,
  },
  caption: {
    display: 'block',
    fontSize: { base: fontSizes.xs, md: fontSizes.sm },
    lineHeight: { base: lineHeights.tight, md: lineHeights.normal },
  },
  h1: {
    fontFamily: availableFonts.primary,
    fontSize: { base: fontSizes['4xl'], md: fontSizes['5xl'] },
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h2: {
    fontFamily: availableFonts.primary,
    fontSize: { base: fontSizes['3xl'], md: fontSizes['4xl'] },
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.tight,
    letterSpacing: letterSpacings.tight,
  },
  h3: {
    fontFamily: availableFonts.primary,
    fontSize: { base: fontSizes['2xl'], md: fontSizes['3xl'] },
    fontWeight: fontWeights.medium,
  },
  h4: {
    fontFamily: availableFonts.primary,
    fontSize: { base: fontSizes.xl, md: fontSizes['2xl'] },
    fontWeight: fontWeights.medium,
  },
  h5: {
    fontFamily: availableFonts.primary,
    fontSize: { base: fontSizes.lg, md: fontSizes.xl },
    fontWeight: fontWeights.medium,
  },
  h6: {
    fontFamily: availableFonts.primary,
    fontSize: { base: fontSizes.md, md: fontSizes.lg },
    fontWeight: fontWeights.medium,
  },
  headline: {
    fontFamily: availableFonts.primary,
    fontSize: { base: fontSizes.md, lg: fontSizes.lg },
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.relaxed,
  },
  p: {
    display: 'block',
    fontSize: { md: fontSizes.md },
  },
  subhead: {
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.relaxed,
  },
  tag: {
    height: space.md,
    backgroundColor: palette.warning[700],
    color: palette.shading[100],
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    top: space.sm,
    right: space.sm,
    padding: `${space.xxxs} ${space.xs}`,
    fontSize: fontSizes.xs,
  },
  textHighlight: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.relaxed,
    color: palette.primary[900],
    padding: space.md,
  },
}

const sizes = {
  // XXL
  XXL: {
    fontSize: { base: fontSizes.xl, lg: fontSizes.xxl },
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Desktop/XXL': {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Mobile/XXL': {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  // XL
  XL: {
    fontSize: { base: fontSizes.lg, lg: fontSizes.xl },
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Desktop/2XL': {
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Desktop/XL': {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Mobile/XL': {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  // L
  L: {
    fontSize: { base: fontSizes.md, lg: fontSizes.lg },
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Desktop/L': {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Mobile/L': {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  // M
  M: {
    fontSize: { base: fontSizes.sm, lg: fontSizes.md },
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Desktop/M': {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Mobile/M': {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.black,
    lineHeight: '120%',
    textTransform: 'none',
  },
  // Default
  Default: {
    fontSize: fontSizes.default,
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Desktop/Default': {
    fontSize: fontSizes.default,
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
    textTransform: 'none',
  },
  // S
  S: {
    fontSize: { base: fontSizes.xs, md: fontSizes.sm },
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Desktop/S': {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Mobile/S': {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.bold,
    lineHeight: '120%',
    textTransform: 'none',
  },
  // XS
  XS: {
    fontSize: { base: fontSizes.xxs, md: fontSizes.xs },
    fontWeight: fontWeights.extrabold,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Desktop/XS': {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.extrabold,
    lineHeight: '120%',
    textTransform: 'none',
  },
  'Mobile/XS': {
    fontSize: fontSizes.xxs,
    fontWeight: fontWeights.extrabold,
    lineHeight: '120%',
    textTransform: 'none',
  },
  // Body-XL
  'Body-XL': {
    fontFamily: availableFonts.secondary,
    fontSize: { base: fontSizes.md, lg: fontSizes.lg },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  'Desktop/Body-XL': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  'Mobile/Body-XL': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  // Body-L
  'Body-L': {
    fontFamily: availableFonts.secondary,
    fontSize: { base: fontSizes.default, lg: fontSizes.md },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  'Desktop/Body-L': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  'Mobile/Body-L': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.default,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  // Body-Default
  'Body-Default': {
    fontFamily: availableFonts.secondary,
    fontSize: { base: fontSizes.sm, md: fontSizes.default },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  'Desktop/Body-Default': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.default,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  'Mobile/Body-Default': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  // Body-S
  'Body-S': {
    fontFamily: availableFonts.secondary,
    fontSize: { base: fontSizes.xs, md: fontSizes.sm },
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  'Desktop/Body-S': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  'Mobile/Body-S': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
    textTransform: 'none',
  },
  // Body-XS
  'Body-XS': {
    fontFamily: availableFonts.secondary,
    fontSize: { base: fontSizes['2xs'], md: fontSizes.xs },
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
    textTransform: 'none',
  },
  'Body-XXS': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes['2xs'],
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
    textTransform: 'none',
  },
  'Desktop/Body-XS': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
    textTransform: 'none',
  },
  'Mobile/Body-XS': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes['2xs'],
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
    textTransform: 'none',
  },
  Eyebrow: {
    fontFamily: availableFonts.secondary,
    fontSize: { base: fontSizes.xs, md: fontSizes.sm },
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    lineHeight: { base: '4', md: '5' },
    fontWeight: fontWeights.bold,
    maxWidth: '450px',
  },
  'Desktop/Eyebrow': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.sm,
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    lineHeight: '5',
    fontWeight: fontWeights.bold,
    maxWidth: '450px',
  },
  'Mobile/Eyebrow': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.xs,
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    lineHeight: '4',
    fontWeight: fontWeights.bold,
    maxWidth: '450px',
  },
  'Eyebrow/Default': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.default,
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    lineHeight: { base: '4', md: '5' },
    fontWeight: fontWeights.bold,
    maxWidth: '450px',
  },
  'Eyebrow/Small': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.sm,
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    lineHeight: { base: '4', md: '5' },
    fontWeight: fontWeights.bold,
    maxWidth: '450px',
  },
  'Eyebrow/XS': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.xs,
    textTransform: 'uppercase',
    letterSpacing: letterSpacings.loose,
    lineHeight: { base: '4', md: '5' },
    fontWeight: fontWeights.bold,
    maxWidth: '450px',
  },
  'Link/XL': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Link/L': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Link/Default': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.default,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Link/Small': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.default,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Link/XS': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.normal,
    lineHeight: '150%',
  },
  'Link/XXS': {
    fontFamily: availableFonts.secondary,
    fontSize: fontSizes.xxs,
    fontWeight: fontWeights.normal,
    lineHeight: '125%',
  },
}
export const textStyles = { ...sizes, ...variants }
