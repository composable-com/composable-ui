import * as React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { IntlConfig } from '@composable/types'
import { ComposableProvider } from './composable-provider'
import { IntlProvider } from './intl-provider'
import { GoogleTagManager } from './google-tag-manager'

import 'focus-visible/dist/focus-visible' // Disabling border for non-keyboard interactions

export type ComposableProps = {
  children: React.ReactElement | React.ReactElement[]
  theme?: any
  googleTagManagerId?: string
  intl?: IntlConfig[]
}

export const Composable = ({
  theme,
  googleTagManagerId,
  children,
}: ComposableProps) => {
  return (
    <ComposableProvider>
      <IntlProvider>
        <>
          <GoogleTagManager googleTagManagerId={googleTagManagerId} />
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </>
      </IntlProvider>
    </ComposableProvider>
  )
}
