import { ReactNode } from 'react'
import { Flex, Text } from '@chakra-ui/react'

export interface CartSummaryItemProps {
  label: string
  children?: ReactNode
}

export const CartSummaryItem = (props: CartSummaryItemProps) => {
  const { label, children } = props
  return (
    <Flex justify="space-between">
      <Text
        textStyle={{ base: 'Desktop/Body-XS', md: 'Desktop/Body-S' }}
        color="text"
      >
        {label}
      </Text>
      {children}
    </Flex>
  )
}
