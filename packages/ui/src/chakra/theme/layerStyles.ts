import { borderStyles } from './foundations/borderStyles'

export const layerStyles = {
  'divider-default': {
    borderStyle: borderStyles.normal,
    borderColor: 'gray.300',
    borderWidth: '0 0 1px 0',
  },
  'no-scroll-bar': {
    'div:first-of-type::-webkit-scrollbar': {
      display: 'none' /* for Chrome, Safari, and Opera */,
    },
    'div:first-of-type': {
      MsOverflowStyle: 'none' /* for Internet Explorer, Edge */,
      scrollbarWidth: 'none' /* for Firefox */,
    },
  },
  highlight: {
    backgroundColor: 'highlight',
    textColor: 'background',
  },
  dark: {
    backgroundColor: 'text',
    textColor: 'background',
  },
  light: {
    backgroundColor: 'background',
    textColor: 'text',
  },
  'dark-text': {
    textColor: 'background',
  },
  'light-text': {
    textColor: 'text',
  },
}
