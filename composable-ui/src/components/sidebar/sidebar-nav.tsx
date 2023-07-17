import { Text, VStack } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

import { SidebarLogout } from './sidebar-logout'
import { SideBarNavMenu, MenuItem } from './sidebar-nav-menu'

interface SidebarNavProps {
  activeItem?: MenuItem
  logout: () => void
  size: 'Small' | 'Large'
  state?: 'Expanded' | 'Collapsed'
}

export const SidebarNav = ({
  activeItem,
  logout,
  size,
  state = 'Expanded',
}: SidebarNavProps) => {
  const intl = useIntl()
  if (state !== 'Expanded') return <></>

  return (
    <>
      {size === 'Small' && (
        <>
          <SideBarNavMenu activeItem={activeItem} />
          <SidebarLogout onClick={logout} />
        </>
      )}
      {size === 'Large' && (
        <>
          <Text textStyle={'Desktop/XS'} height={'24px'}>
            {intl.formatMessage({ id: 'account.dashboard.title' })}
          </Text>
          <VStack spacing={'0'} width={'full'} alignItems={'stretch'}>
            <SideBarNavMenu activeItem={activeItem} />
            <SidebarLogout onClick={logout} />
          </VStack>
        </>
      )}
    </>
  )
}
