import { paletteTokens } from './colors'

export const semanticTokens = {
  colors: {
    // Figma tokens
    background: {
      default: paletteTokens.colors.light['background'],
      _dark: paletteTokens.colors.dark['background'],
    },
    text: {
      default: paletteTokens.colors.light['text'],
      _dark: paletteTokens.colors.dark['text'],
    },
    'text-muted': {
      default: paletteTokens.colors.light['text-muted'],
      _dark: paletteTokens.colors.dark['text-muted'],
    },
    primary: {
      default: paletteTokens.colors.light['primary'],
      _dark: paletteTokens.colors.dark['primary'],
    },
    secondary: {
      default: paletteTokens.colors.light['secondary'],
      _dark: paletteTokens.colors.dark['secondary'],
    },
    highlight: {
      default: paletteTokens.colors.dark['primary'],
      _dark: paletteTokens.colors.dark['primary'],
    },
    muted: {
      default: paletteTokens.colors.light['muted'],
      _dark: paletteTokens.colors.dark['muted'],
    },
    accent: {
      default: paletteTokens.colors.light['accent'],
      _dark: paletteTokens.colors.dark['accent'],
    },
    // Custom tokens (not in Figma)
    'bg-danger': {
      default: 'danger-med',
      _dark: 'danger-dark',
    },
    'bg-success': {
      default: 'success-med',
      _dark: 'success-dark',
    },
    'bg-btn-muted': {
      default: paletteTokens.colors.light['muted'],
      _dark: paletteTokens.colors.dark['muted'],
    },
    'fg-btn-muted': {
      default: paletteTokens.colors.light['text'],
      _dark: paletteTokens.colors.dark['text-muted'],
    },
  },
}
