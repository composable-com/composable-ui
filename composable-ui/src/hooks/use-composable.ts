import * as React from 'react'
import { ComposableContext } from 'components/composable-provider'

export const useComposable = () => {
  const context = React.useContext(ComposableContext)
  if (context === undefined) {
    throw new Error('useComposable must be used within a ComposableProvider')
  }
  return context
}
