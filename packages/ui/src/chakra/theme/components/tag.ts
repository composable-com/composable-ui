import { StyleConfig } from '@chakra-ui/react'

export const Tag: StyleConfig = {
  baseStyle: () => ({
    container: {
      fontWeight: 700,
      letterSpacing: '0.04em',
      padding: '2px 4px',
      borderRadius: '2px',
      fontSize: '12px',
      gap: '4px',
    },
  }),
  variants: {
    solid: () => {
      return {
        container: {
          bg: 'primary',
          color: 'white',
        },
      }
    },
    'solid-green': () => {
      return {
        container: {
          bg: 'success.100',
          color: 'success.500',
        },
      }
    },
    'solid-orange': () => {
      return {
        container: {
          bg: 'warning.100',
          color: 'warning.500',
        },
      }
    },
    'solid-gray': () => {
      return {
        container: {
          bg: 'muted',
          color: 'text-muted',
        },
      }
    },
    outline: () => {
      return {
        container: {
          bg: 'white',
          color: 'primary',
          borderColor: 'primary',
        },
      }
    },
    subtle: () => {
      return {
        container: {
          bg: 'highlight',
          color: 'primary',
        },
      }
    },
  },
}
