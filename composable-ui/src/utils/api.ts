/**
 * This is the client-side entrypoint for your tRPC API.
 * It's used to create the `api` object which contains the Next.js App-wrapper
 * as well as your typesafe react-query hooks.
 *
 * We also create a few inference helpers for input and output types
 */
import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import superjson from 'superjson'

import { type AppRouter } from '../server/api/root'
import { getSiteUrl } from './get-site-url'

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  return getSiteUrl()
}

async function getCSRFToken() {
  const csrfTokenResponse = await fetch('/api/auth/csrf')
  const { csrfToken } = await csrfTokenResponse.json()
  return csrfToken
}

/**
 * A set of typesafe react-query hooks for your tRPC API
 */
export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      /**
       * React query defaults
       * https://tanstack.com/query/latest/docs/react/guides/important-defaults
       */
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 2 * 60 * 1000,
            cacheTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      },

      /**
       * Transformer used for data de-serialization from the server
       * @see https://trpc.io/docs/data-transformers
       **/
      transformer: superjson,

      /**
       * Links used to determine request flow from client to server
       * @see https://trpc.io/docs/links
       * */
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          async fetch(input, init) {
            if (init && init.method !== 'GET') {
              const token = await getCSRFToken()
              init.headers = { ...init.headers, 'x-csrf-token': token }
            }
            return fetch(input, init)
          },
        }),
      ],
    }
  },
  /**
   * Whether tRPC should await queries when server rendering pages
   * @see https://trpc.io/docs/nextjs#ssr-boolean-default-false
   */
  ssr: false,
})

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>

/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>
