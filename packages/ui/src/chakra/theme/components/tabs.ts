import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { tabsAnatomy } from '@chakra-ui/anatomy'

import { borders } from '../foundations/borders'
import { borderStyles } from '../foundations/borderStyles'

const helpers = createMultiStyleConfigHelpers(tabsAnatomy.keys)

export const Tabs = helpers.defineMultiStyleConfig({
  variants: {
    line: () => {
      return {
        tab: {
          color: 'gray.400',
          _focus: {
            borderColor: 'primary',
            color: 'primary',
          },
          _selected: {
            borderColor: 'primary',
            color: 'primary',
            bg: 'transparent',
          },
        },
        tablist: {
          borderColor: 'transparent',
        },
      }
    },
    'soft-rounded': () => {
      return {
        tab: {
          borderColor: 'gray.400',
          color: 'gray.400',
          borderWidth: borders.sm,
          borderStyle: borderStyles.normal,
          bg: 'transparent',
          _focus: {
            borderColor: 'primary',
            color: 'primary',
          },
          _selected: {
            borderColor: 'primary',
            color: 'primary',
            bg: 'transparent',
          },
        },
      }
    },
    'solid-rounded': () => {
      return {
        tab: {
          borderColor: 'transparent',
          bg: 'transparent',
          color: 'gray.400',
          borderWidth: borders.sm,
          borderStyle: borderStyles.normal,
          _focus: {
            borderColor: 'primary',
            bg: 'primary',
            color: 'white',
          },
          _selected: {
            borderColor: 'primary',
            bg: 'primary',
            color: 'white',
          },
        },
      }
    },
    highlight: () => {
      return {
        tab: {
          color: 'text',
          _selected: {
            color: 'primary',
          },
        },
      }
    },
  },
})
