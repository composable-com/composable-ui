import { StyleConfig } from '@chakra-ui/react'

export const Badge: StyleConfig = {
  baseStyle: () => ({
    textTransform: 'uppercase',
    fontWeight: 700,
    letterSpacing: '0.04em',
    padding: '0px 4px',
    borderRadius: '2px',
    fontSize: '12px',
  }),
  variants: {
    solid: () => ({
      bg: 'primary',
    }),
    outline: () => ({
      bg: 'white',
      color: 'primary',
      borderColor: 'primary',
    }),
    subtle: () => ({
      bg: 'highlight',
      color: 'primary',
    }),
  },
}
