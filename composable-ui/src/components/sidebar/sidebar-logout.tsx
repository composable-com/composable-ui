import { Box, Button, ButtonProps } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface SidebarLogoutProps {
  onClick?: () => void
  buttonProps?: ButtonProps
}

export const SidebarLogout = ({ onClick, buttonProps }: SidebarLogoutProps) => {
  const intl = useIntl()

  return (
    <Box width={'full'}>
      <Button
        borderRadius={'6px'}
        height={'40px'}
        margin={'24px 0'}
        onClick={() => onClick?.()}
        size={'md'}
        textStyle={'Mobile/XS'}
        variant={'outline'}
        width={'full'}
        {...buttonProps}
      >
        {intl.formatMessage({ id: 'action.logout' })}
      </Button>
    </Box>
  )
}
