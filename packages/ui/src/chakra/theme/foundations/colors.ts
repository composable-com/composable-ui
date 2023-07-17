import colorsPalette from '../../colorsPalette.json'

// Note: colorsPalette.json could come from CMS or Figma design token output
export const palette = {
  white: colorsPalette.white,
  black: colorsPalette.black,
  primary: {
    ...colorsPalette.primary,
  },
  secondary: {
    ...colorsPalette.secondary,
  },
  tertiary: {
    ...colorsPalette.tertiary,
  },
  success: {
    ...colorsPalette.success,
  },
  danger: {
    ...colorsPalette.danger,
  },
  warning: {
    ...colorsPalette.warning,
  },
  info: {
    ...colorsPalette.info,
  },
  shading: {
    ...colorsPalette.shading,
  },
}

// Color Tokens - Global Status
const colorTokens = {
  // info
  'info-light': palette.info['100'],
  'info-med': palette.info['500'],
  'info-dark': palette.info['900'],
  // success
  'success-light': palette.success['100'],
  'success-med': palette.success['500'],
  'success-dark': palette.success['900'],
  // warning
  'warning-light': palette.warning['100'],
  'warning-med': palette.warning['500'],
  'warning-dark': palette.warning['700'],
  // danger
  'danger-light': palette.danger['100'],
  'danger-med': palette.danger['500'],
  'danger-dark': palette.danger['900'],
}

export const paletteTokens = {
  colors: {
    light: {
      background: palette.white,
      text: palette.shading['900'],
      'text-muted': palette.shading['400'],
      primary: palette.primary['500'],
      secondary: palette.primary['800'],
      highlight: palette.primary['100'],
      muted: palette.shading['200'],
      accent: palette.primary['200'],
    },
    dark: {
      background: palette.shading['900'],
      text: palette.white,
      'text-muted': palette.shading['300'],
      primary: palette.primary['500'],
      secondary: palette.primary['800'],
      highlight: palette.primary['100'],
      muted: palette.shading['200'],
      accent: palette.primary['200'],
    },
  },
}
export type Colors = typeof palette & typeof paletteTokens & typeof colorTokens

export const colors = { ...palette, ...paletteTokens, ...colorTokens }
