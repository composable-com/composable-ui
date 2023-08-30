import { useIntl } from 'react-intl'
import { useSession } from 'next-auth/react'
import { Box, BoxProps, Button, Text, Image } from '@chakra-ui/react'
import { IoPersonCircleOutline } from 'react-icons/io5'
import { useComposable } from '../../hooks'
import { getInitials } from 'utils/get-initials'

export const LoginAction = (props: { rootProps?: BoxProps }) => {
  const intl = useIntl()
  const { data: session } = useSession()
  const { accountDrawer, menuDrawer } = useComposable()
  const userName = session?.loggedIn
    ? getInitials(session?.user?.name ?? '')
    : ''

  const message = {
    closeMyAccount: intl.formatMessage({ id: 'action.closeMyAccountMenu' }),
    openMyAccount: intl.formatMessage({ id: 'action.openMyAccountMenu' }),
    signIn: intl.formatMessage({ id: 'action.signIn' }),
    myAccount: intl.formatMessage({ id: 'account.dashboard.title' }),
  }
  const loggedIn = session && session.loggedIn

  return (
    <Box display={'flex'} {...props.rootProps}>
      <Button
        color={'text'}
        variant="link"
        textDecoration={'underline'}
        textUnderlineOffset={'5px'}
        aria-label={
          loggedIn
            ? accountDrawer.isOpen
              ? message.closeMyAccount
              : message.openMyAccount
            : message.signIn
        }
        onClick={() => {
          menuDrawer.onClose()
          accountDrawer.onToggle()
        }}
      >
        <Box mr={2.5}>
          {userName ? (
            <Box
              borderRadius={'50%'}
              background={'text'}
              color={'background'}
              textStyle={'Mobile/Body-S'}
              fontWeight={'700'}
              height={'26px'}
              width={'26px'}
              padding={1}
            >
              {userName}
            </Box>
          ) : (
            <IoPersonCircleOutline size="26px" color="#111111" />
          )}
        </Box>

        <Text textStyle={'Desktop/Body-S'} fontWeight={'700'}>
          {loggedIn ? message.myAccount : message.signIn}
        </Text>
      </Button>
    </Box>
  )
}
