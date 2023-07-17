import { StyleConfig } from '@chakra-ui/react'
import { textStyles } from '../textStyles'

export const Button: StyleConfig = {
  baseStyle: {
    borderRadius: '6px',
  },
  sizes: {
    xs: {
      height: '24px',
      ...textStyles['Mobile/XS'],
    },
    sm: {
      height: '32px',
      ...textStyles['Desktop/XS'],
    },
    md: {
      height: '40px',
      ...textStyles['Desktop/S'],
    },
    lg: {
      height: '48px',
      ...textStyles['Desktop/Default'],
    },
  },
  variants: {
    link: {
      color: 'shading.500',
    },
    solid: {
      color: 'background',
      background: 'primary.500',
      _hover: {
        bg: 'primary.400',
        _disabled: {
          bg: 'text-muted',
        },
      },
      _active: {
        bg: 'primary',
      },
      _disabled: {
        opacity: 0.5,
        bg: 'text-muted',
      },
    },
    'solid-alt': {
      color: 'text',
      background: 'background',
      _hover: {
        bg: 'background',
        _disabled: {
          bg: 'text-muted',
        },
      },
      _active: {
        bg: 'background',
      },
      _disabled: {
        opacity: 1,
        bg: 'text-muted',
      },
    },
    outline: {
      color: 'primary',
      borderColor: 'primary',
      _hover: {
        bg: 'muted',
        borderColor: 'primary',
        _disabled: {
          color: 'muted',
          borderColor: 'muted',
        },
      },
      _active: {
        bg: 'accent',
        borderColor: 'accent',
      },
      _disabled: {
        opacity: 1,
        color: 'text-muted',
        borderColor: 'text-muted',
      },
    },
    'outline-black': {
      color: 'text',
      borderColor: '#E2E8F0',
      borderWidth: '1px',
      borderStyle: 'solid',
      _hover: {
        bg: 'muted',
        borderColor: 'primary',
        _disabled: {
          color: 'muted',
          borderColor: 'muted',
        },
      },
      _active: {
        bg: 'accent',
        borderColor: 'accent',
      },
      _disabled: {
        opacity: 1,
        color: 'text-muted',
        borderColor: 'text-muted',
      },
    },
    'outline-alt': {
      color: 'background',
      borderColor: 'background',
      borderWidth: '1px',
      borderStyle: 'solid',
      _hover: {
        bg: 'text',
        borderColor: 'background',
        _disabled: {
          color: 'text-muted',
          borderColor: 'text-muted',
        },
      },
      _active: {
        bg: 'background',
        borderColor: 'background',
      },
      _disabled: {
        opacity: 0.5,
        color: 'text-muted',
        borderColor: 'text-muted',
      },
    },
    ghost: {
      color: 'primary',
      borderColor: 'primary',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      __before: {
        content: '" "',
        display: 'block',
        width: '10px',
        height: '10px',
        background: 'red',
      },
      _hover: {
        bg: 'background',
        borderColor: 'text-muted',
      },
      _active: {
        bg: 'text',
        borderColor: 'text-muted',
      },
      _disabled: {
        opacity: 1,
        color: 'text-muted',
        borderColor: 'text-muted',
      },
    },
    'ghost-alt': {
      color: 'white',
      borderColor: 'white',
      textDecoration: 'underline',
      textUnderlineOffset: '3px',
      __before: {
        content: '" "',
        display: 'block',
        width: '10px',
        height: '10px',
        background: 'red',
      },
      _hover: {
        bg: 'background',
        borderColor: 'text-muted',
      },
      _active: {
        bg: 'background',
        borderColor: 'text-muted',
      },
      _disabled: {
        opacity: 1,
        color: 'text-muted',
        borderColor: 'text-muted',
      },
    },
    danger: {
      color: 'white',
      background: 'bg-danger',
    },
    success: {
      color: 'white',
      background: 'bg-success',
    },
    muted: {
      color: 'fg-btn-muted',
      background: 'bg-btn-muted',
    },
  },
}
