import * as React from 'react'
import { useRouter } from 'next/router'
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

export interface ComposableContext {
  accountDrawer: UseDisclosureReturn
  cartDrawer: UseDisclosureReturn
  locale: string
  menuDrawer: UseDisclosureReturn
  setLocale: (locale: string) => void
}

export const ComposableContext = React.createContext<
  ComposableContext | undefined
>(undefined)

export interface ComposableProviderProps {
  children: JSX.Element
}

export const ComposableProvider = ({ children }: ComposableProviderProps) => {
  const session = useSession()
  const router = useRouter()
  const cartDrawer = useDisclosure()
  const menuDrawer = useDisclosure()
  const accountDrawer = useDisclosure()
  const currentLocale =
    router?.locale || router?.defaultLocale || FALLBACK_LOCALE

  const setLocaleHandler = React.useCallback(
    (locale: string) => {
      const { pathname, asPath, query } = router
      router.push({ pathname, query }, asPath, { locale })
    },
    [router]
  )

  useEffect(() => {
    // If user is not logged in, sign in anonymously
    if (session.status === 'unauthenticated') {
      signIn('anon', { redirect: false })
    }
  }, [session])

  return (
    <ComposableContext.Provider
      value={{
        accountDrawer,
        cartDrawer,
        locale: currentLocale,
        menuDrawer,
        setLocale: setLocaleHandler,
      }}
    >
      {children}
    </ComposableContext.Provider>
  )
}

const FALLBACK_LOCALE = 'en-US'
