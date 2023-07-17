import { VStack, Text, Box } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import {
  IoCardOutline,
  IoHeartOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoTimeOutline,
} from 'react-icons/io5'

import { SidebarItem } from './sidebar-item'
import { useComposable } from '../../hooks'

interface SideBarNavMenuProps {
  activeItem?: MenuItem
}

export type MenuItem = {
  path: string
  icon: JSX.Element
  label: string
  intlId: string
  otherProps?: Record<string, any>
}

export const menuItems = [
  {
    path: 'profile',
    icon: <IoPersonOutline size={'24px'} />,
    label: 'Profile & Preferences',
    intlId: 'account.dashboard.menu.profileAndPreferences',
  },
  {
    path: 'address',
    icon: <IoHomeOutline size={'24px'} />,
    label: 'Saved Addresses',
    intlId: 'account.dashboard.menu.savedAddresses',
  },
  {
    path: 'payment',
    icon: <IoCardOutline size={'24px'} />,
    label: 'Payment Methods',
    intlId: 'account.dashboard.menu.paymentMethod',
  },
  {
    path: 'wishlist',
    icon: <IoHeartOutline size={'24px'} />,
    label: 'Wishlist',
    intlId: 'account.dashboard.menu.wishlist',
  },
  {
    path: 'order',
    icon: <IoTimeOutline size={'24px'} />,
    label: 'Order History',
    intlId: 'account.dashboard.menu.orderHistory',
    otherProps: {
      borderBottom: 'none',
    },
  },
]

export const SideBarNavMenu = ({ activeItem }: SideBarNavMenuProps) => {
  const { accountDrawer } = useComposable()
  const intl = useIntl()

  return (
    <VStack spacing={'0'} gap={'3px'}>
      <Box padding={'8px 0'} alignSelf={'flex-start'}>
        <Text
          textStyle={'Mobile/Eyebrow'}
          color={'text-muted'}
          display={{ base: 'inital', md: 'none' }}
        >
          {intl.formatMessage({ id: 'account.dashboard.account' })}
        </Text>
      </Box>

      {menuItems.map((item) => (
        <SidebarItem
          key={`${item.path}`}
          label={intl.formatMessage({ id: item.intlId })}
          href={'/#'}
          state={item.path === activeItem?.path ? 'Active' : 'Default'}
          rootProps={{
            leftIcon: item.icon,
            height: { base: '41px !important', md: '53px !important' },
            size: { base: 'sm', md: 'lg' },
            padding: { base: '16px 0 !important', md: '16px 8px !important' },
            onClick: () => {
              accountDrawer.onClose()
            },
            ...(item.otherProps ?? {}),
          }}
        />
      ))}
    </VStack>
  )
}
