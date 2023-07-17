import { extendTheme } from '@chakra-ui/react'

import { foundations } from './theme/foundations'
import { textStyles } from './theme/textStyles'
import { layerStyles } from './theme/layerStyles'
import * as components from './theme/components'
import { styles } from './theme/styles'
import { semanticTokens } from './theme/foundations/semanticTokens'
import { fonts } from './theme/foundations/typography'

/*
  Chakra-UI theme source: https://github.com/chakra-ui/chakra-ui/tree/main/packages/components/theme/src
  
  ## Theme typings and autocomplete
  for the extended theme to be added to autocomplete
  1. go to your project root, make sure @chakra-ui/cli is installed for the dev environment or just install it:

    ```pnpm add --dev @chakra-ui/cli```

  2. then run: `pnpm theme` or `npx chakra-cli tokens [path to this theme file]`
  3. restart Typescript Server (Command + Shift + P on any TS file, then find Restart TS server)
  4. your customized theme should be available for autocomplete now 

  - https://chakra-ui.com/docs/styled-system/theming/advanced#theme-typings

  ## How to customize the theme
  - https://chakra-ui.com/docs/styled-system/theme

  ## How to override components
  - https://chakra-ui.com/docs/styled-system/component-style
*/

/* 
    the export name must be `theme` here for the `npx chakra-cli tokens` to work
*/

export const theme = extendTheme({
  ...foundations,
  textStyles,
  layerStyles,
  styles, // Global style override
  semanticTokens,
  components: {
    ...components,
  },
  ...fonts,
})
