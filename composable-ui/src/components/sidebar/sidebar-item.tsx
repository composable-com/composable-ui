import { Button, ButtonProps, Text, TextProps } from '@chakra-ui/react'
import Link from 'next/link'

interface SidebarItemProps {
  href: string
  children?: React.ReactNode
  label?: string
  rootProps?: Omit<ButtonProps, 'children'>
  state?: 'Default' | 'Hover' | 'Active'
  textProps?: TextProps
}

export const SidebarItem = ({
  href,
  children,
  label,
  rootProps,
  state = 'Default',
  textProps,
}: SidebarItemProps) => {
  const isActive = state === 'Active'
  return (
    <Link passHref href={href} legacyBehavior>
      <Button
        role={'link'}
        alignItems={'center'}
        backgroundColor={state === 'Hover' ? 'highlight' : 'background'}
        borderRadius={'6px'}
        color={'text'}
        display={'flex'}
        height={{ base: '37px', md: ' 53px' }}
        isActive={isActive}
        justifyContent={'flex-start'}
        padding={{ base: '16px 0', md: '16px 8px' }}
        textDecoration={'none'}
        variant={'ghost'}
        width={'full'}
        _hover={{
          background: 'highlight',
        }}
        _active={{
          color: 'primary',
          textStyle: 'Desktop/Body-Default',
          fontWeight: '700 !important',
          textDecoration: 'underline',
          textUnderlineOffset: '8px',
        }}
        {...rootProps}
      >
        {children ? (
          children
        ) : (
          <Text
            textStyle="Desktop/Body-Default"
            {...(isActive && { fontWeight: '700' })}
            {...textProps}
          >
            {label}
          </Text>
        )}
      </Button>
    </Link>
  )
}
