import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'
import { inputAnatomy } from '@chakra-ui/anatomy'
import { mode } from '@chakra-ui/theme-tools'

import { borders } from '../foundations/borders'
import { borderStyles } from '../foundations/borderStyles'

const helpers = createMultiStyleConfigHelpers(inputAnatomy.keys)

export const Input = helpers.defineMultiStyleConfig({
  baseStyle: {
    field: {
      borderWidth: borders.sm,
      borderStyle: borderStyles.normal,
    },
  },
  variants: {
    outline: (props) => {
      return {
        field: {
          borderColor: 'inherit',
          fontSize: 'base',
          bg: mode('white', 'black')(props),
          _placeholder: {
            color: 'text-muted',
          },
          _focus: {
            borderWidth: borders.sm,
            borderStyle: borderStyles.normal,
            borderColor: 'blue.300',
          },
          _invalid: {
            borderColor: 'red.300',
          },
        },
        addon: {
          border: '1px solid',
          borderColor: mode('inherit', 'whiteAlpha.50')(props),
          bg: mode('gray.100', 'whiteAlpha.300')(props),
        },
      }
    },
  },
  defaultProps: {
    variant: 'outline',
  },
})
