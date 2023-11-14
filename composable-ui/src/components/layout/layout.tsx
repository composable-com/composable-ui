import { ReactElement } from 'react'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { Box, Flex, Link, Text } from '@chakra-ui/react'

import { APP_CONFIG } from 'utils/constants'
import { cmsFooterLinks } from './_data'
import { getSiteUrl } from 'utils/get-site-url'
import { Header } from './header'
import { Logo } from '../logo'
import { useComposable } from 'hooks'
import { useOnScreen } from '../../hooks'

const DynamicCartDrawer = dynamic(() =>
  import('components/cart').then((_module) => _module.CartDrawer)
)

const DynamicMenuDrawer = dynamic(() =>
  import('../menu/menu-drawer').then((_module) => _module.MenuDrawer)
)

const DynamicAccountDrawer = dynamic(() =>
  import('../account/account-drawer').then((_module) => _module.AccountDrawer)
)

const DynamicFooter = dynamic(() =>
  import('./footer').then((_module) => _module.Footer)
)

interface Props {
  children?: ReactElement | ReactElement[]
}

export const Layout = ({ children }: Props) => {
  const { locale, cartDrawer, menuDrawer, accountDrawer } = useComposable()
  const router = useRouter()
  const isCheckout = router.pathname === '/checkout'
  const [footerRef, footerVisible] = useOnScreen<HTMLDivElement>({
    rootMargin: '300px',
  })

  const SeoConfig = (
    <DefaultSeo
      defaultTitle={APP_CONFIG.NAME}
      titleTemplate={APP_CONFIG.TITLE_TEMPLATE}
      openGraph={{
        type: 'website',
        locale,
        url: getSiteUrl(),
        site_name: APP_CONFIG.NAME,
      }}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: APP_CONFIG.FAVICON,
        },
      ]}
    />
  )

  if (isCheckout) {
    return (
      <Box minHeight="100vh" bg={'shading.100'}>
        {SeoConfig}
        {children}
      </Box>
    )
  }

  // @ts-ignore
  return (
    <>
      <Flex direction="column" minHeight="100vh">
        {SeoConfig}

        <Header />
        <Box flexGrow="1" role="main">
          {children}
        </Box>

        <Box ref={footerRef}>
          {footerVisible && (
            <DynamicFooter
              brandLogo={<Logo h={6} />}
              copyrightText={APP_CONFIG.COPYRIGHT}
              homeUrl={'/'}
              tagline={APP_CONFIG.TAG_LINE}
              message={<FooterMessage />}
              parentMenuItems={cmsFooterLinks}
            />
          )}
        </Box>
      </Flex>

      {cartDrawer.isOpen && <DynamicCartDrawer />}
      {menuDrawer.isOpen && <DynamicMenuDrawer />}
      {accountDrawer.isOpen && <DynamicAccountDrawer />}
    </>
  )
}

const FooterMessage = () => {
  return (
    <Box pt={8}>
      <Text textStyle={'Desktop/Body-XL'}>
        {APP_CONFIG.FOOTER_MESSAGE + ' '}
        <Link
          as={NextLink}
          href={APP_CONFIG.URL}
          target="_blank"
          textDecor={'underline'}
          prefetch={false}
        >
          {APP_CONFIG.URL_TEXT}
        </Link>
      </Text>
    </Box>
  )
}
