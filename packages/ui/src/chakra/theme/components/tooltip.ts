import { cssVar } from '@chakra-ui/theme-tools'
import { StyleConfig } from '@chakra-ui/react'

const arrowBg = cssVar('popper-arrow-bg')
export const Tooltip: StyleConfig = {
  baseStyle: {
    bg: 'text',
    color: 'background',
    [arrowBg.variable]: cssVar('chakra-colors-text').reference,
  },
  variants: {
    dark: {
      bg: cssVar('chakra-colors-text').reference,
      color: 'background',
      [arrowBg.variable]: cssVar('chakra-colors-text').reference,
    },
    light: {
      bg: 'background',
      color: 'text',
      [arrowBg.variable]: cssVar('chakra-colors-background').reference,
    },
    highlight: {
      bg: 'highlight',
      color: 'text',
      [arrowBg.variable]: cssVar('chakra-colors-highlight').reference,
    },
  },
}
