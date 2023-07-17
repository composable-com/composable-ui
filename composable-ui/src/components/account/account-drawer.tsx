import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'

import { LoginForm, ForgotPasswordForm, RegisterForm } from '../forms'

import { SidebarNav } from '../sidebar'

import { useState } from 'react'
import { useComposable } from '../../hooks'
import { useSession, signIn, signOut } from 'next-auth/react'
import { MenuDrawerBackButton } from '../menu/menu-drawer-back-button'

export enum AccountPage {
  PAGE = 'page',
  DRAWER = 'drawer',
}

export type AccountForm = 'login' | 'forgot_password' | 'create_account'
type Placement = 'right' | 'left'

export const AccountDrawer = ({
  formToShow = 'login',
}: {
  formToShow?: AccountForm
}) => {
  const { data: session } = useSession()

  const drawerPlacement = useBreakpointValue<Placement>(
    { md: 'right', sm: 'left' },
    { ssr: false, fallback: 'left' }
  )

  const { accountDrawer, menuDrawer } = useComposable()
  const [accountFormToShow, setAccountFormToShow] =
    useState<AccountForm>(formToShow)
  const intl = useIntl()
  const handleLogout = () => {
    signOut()
    accountDrawer.onClose()
  }

  const title = intl.formatMessage({ id: 'account.login.title' })

  return (
    <Drawer
      isOpen={accountDrawer.isOpen}
      onClose={accountDrawer.onClose}
      placement={drawerPlacement ?? 'left'}
      size={{ base: 'full', md: 'md' }}
    >
      <DrawerOverlay marginTop={'4rem'} />
      {session?.loggedIn ? (
        <DrawerContent padding={0} marginTop={'4rem'}>
          <DrawerHeader
            minH={'48px'}
            p={'8px 12px'}
            display={'flex'}
            borderBottom={{ base: '1px solid #E2E2E2', md: 'none' }}
          >
            <Center width={'full'} display={{ base: 'flex', md: 'none' }}>
              <Text textStyle={'Desktop/XS'}>
                {intl.formatMessage({ id: 'account.dashboard.title' })}
              </Text>
            </Center>
            <DrawerCloseButton
              size={'md'}
              fontSize={'sm'}
              left={{ base: 'initial', md: '10px' }}
            />
          </DrawerHeader>
          <DrawerBody p={{ base: '24px 16px', md: '24px 64px 60px 64px' }}>
            {/* Desktop */}
            <VStack
              align="stretch"
              spacing={'0'}
              display={{ base: 'none', md: 'flex' }}
            >
              <SidebarNav size="Large" logout={handleLogout} />
            </VStack>
            {/* Mobile */}
            <VStack
              align="stretch"
              spacing={'0'}
              display={{ base: 'flex', md: 'none' }}
            >
              <SidebarNav size="Small" logout={handleLogout} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      ) : (
        <DrawerContent padding={0} marginTop={'4rem'}>
          <DrawerHeader
            minH={'48px'}
            p={'8px 12px'}
            display={'flex'}
            borderBottom={{ base: '1px solid #E2E2E2', md: 'none' }}
          >
            <Box display={{ base: 'flex', md: 'none' }} width={'full'}>
              <MenuDrawerBackButton
                onClick={() => {
                  accountDrawer.onClose()
                  menuDrawer.onOpen()
                }}
              />
              <Center width={'full'} display={{ base: 'flex', md: 'none' }}>
                <Text textStyle={'Mobile/S'}>{title}</Text>
              </Center>
            </Box>
            <DrawerCloseButton
              size={'md'}
              fontSize={'sm'}
              left={{ base: 'initial', md: '10px' }}
            />
          </DrawerHeader>
          <DrawerBody p={{ base: '24px 16px', md: '24px 64px 60px 64px' }}>
            {accountFormToShow === 'login' && (
              <LoginForm
                type={AccountPage.DRAWER}
                setAccountFormToShow={setAccountFormToShow}
                signIn={signIn}
              />
            )}
            {accountFormToShow === 'forgot_password' && (
              <ForgotPasswordForm type={AccountPage.DRAWER} />
            )}
            {accountFormToShow === 'create_account' && (
              <RegisterForm
                setAccountFormToShow={setAccountFormToShow}
                type={AccountPage.DRAWER}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      )}
    </Drawer>
  )
}
