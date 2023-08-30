import NextLink from 'next/link'
import { Button, ButtonProps, Center, Text, TextProps } from '@chakra-ui/react'

export interface MenuItemProps {
  href: string
  children?: React.ReactNode
  label?: string
  rootProps?: Omit<ButtonProps, 'children'>
  state?: 'Default' | 'Active'
  textProps?: TextProps
}

export const MenuItem = ({
  href,
  children,
  label,
  rootProps,
  state = 'Default',
  textProps,
}: MenuItemProps) => {
  const isActive = state === 'Active'
  return (
    <Button
      as={NextLink}
      alignItems={'center'}
      borderBottom={'2px solid'}
      borderColor={'transparent'}
      borderRadius={'0'}
      color={'text'}
      height={'full'}
      href={href}
      isActive={isActive}
      minW={'80px'}
      mx={'5px'}
      role={'link'}
      textDecoration={'none'}
      variant={'ghost'}
      _hover={{
        color: 'primary',
        borderBottom: '2px solid',
        borderColor: 'primary',
      }}
      _active={{
        color: 'primary',
        textStyle: 'Desktop/Body-Default',
        fontWeight: '700 !important',
        borderColor: 'primary',
      }}
      prefetch={false}
      {...rootProps}
    >
      {children ? (
        children
      ) : (
        <Center>
          <Text
            textStyle="Desktop/Body-Default"
            fontSize={'16px'}
            fontFamily={'DM Sans'}
            {...(isActive && { fontWeight: '700' })}
            {...textProps}
          >
            {label}
          </Text>
        </Center>
      )}
    </Button>
  )
}
