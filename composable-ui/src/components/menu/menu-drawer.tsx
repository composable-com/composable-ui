import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useComposable } from 'hooks'
import React from 'react'
import NextLink from 'next/link'
import { IoCallOutline } from 'react-icons/io5'
import { cmsNavLinks } from '../layout/_data'
import { LoginAction } from '../layout/login-action'
import { useIntl } from 'react-intl'
import { useSession, signOut } from 'next-auth/react'
import { SidebarLogout } from 'components/sidebar'

export const MenuDrawer = () => {
  const intl = useIntl()
  const { data: session } = useSession()
  const {
    menuDrawer: { isOpen, onClose },
  } = useComposable()

  return (
    <Drawer isOpen={isOpen} placement="left" size={'full'} onClose={onClose}>
      <DrawerContent marginTop={'4rem'}>
        <DrawerBody>
          {cmsNavLinks.map((item) => (
            <>
              <Link
                as={NextLink}
                href={`/category/${item.slug}`}
                key={item.slug}
                onClick={onClose}
                prefetch={false}
              >
                <Text
                  maxW="md"
                  marginTop="3.5"
                  marginBottom="3.5"
                  textStyle={'Desktop/Body-S'}
                >
                  {item.name}
                </Text>
              </Link>
              <Divider />
            </>
          ))}

          <VStack my="8" width={'full'} alignItems={'left'}>
            <LoginAction rootProps={{ py: 2 }} />
          </VStack>

          {session && <SidebarLogout onClick={signOut} />}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
