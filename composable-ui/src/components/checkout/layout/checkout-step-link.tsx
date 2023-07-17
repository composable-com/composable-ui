import React from 'react'
import { Button } from '@chakra-ui/react'

interface CheckoutStepLinksProps {
  active: boolean
  done: boolean
  isAllowed: boolean
  onClick?: () => void
  title: string
}

export const CheckoutStepLink = ({
  isAllowed,
  active,
  title,
  onClick,
  done,
}: CheckoutStepLinksProps) => {
  return (
    <Button
      borderBottom={active ? '2px' : '0'}
      borderRadius={'0'}
      color={active || done ? 'primary' : 'text-muted'}
      disabled={!isAllowed}
      fontSize={{ base: 'xs', md: 'sm' }}
      onClick={() => isAllowed && onClick !== undefined && onClick()}
      p={{ base: '10px 0px', md: '20px' }}
      textDecoration="none"
      variant="link"
      minWidth={'fit-content'}
      width={'30%'}
      _hover={{
        textDecoration: 'none',
      }}
    >
      {title}
    </Button>
  )
}
