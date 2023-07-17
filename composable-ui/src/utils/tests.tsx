/* istanbul ignore file */
import React from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react'
import { theme } from '@composable/ui'
import { queries, Queries } from '@testing-library/dom'
import { ChakraProvider } from '@chakra-ui/react'

export * from '@testing-library/react'

export function render<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  ui: React.ReactElement,
  {
    locale = 'en-US',
    translations = {},
    ...renderOptions
  }: { locale?: string; translations?: Record<string, string> } & RenderOptions<
    Q,
    Container,
    BaseElement
  > = {}
): RenderResult<Q, Container, BaseElement> {
  const Wrapper = () => {
    return (
      <ReactIntlProvider locale="en-US" messages={translations}>
        <ChakraProvider theme={theme}>{ui}</ChakraProvider>
      </ReactIntlProvider>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}
