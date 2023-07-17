import { ReactNode } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

interface CartDrawerSummaryItemProps {
  label: string
  children?: ReactNode
}

export const CartDrawerSummaryItem = ({
  label,
  children,
}: CartDrawerSummaryItemProps) => {
  return (
    <Flex
      justify="space-between"
      mt={{ base: '4px', md: '5px' }}
      textStyle={'Desktop/Body-XS'}
    >
      <Text>{label}</Text>
      <Box>{children}</Box>
    </Flex>
  )
}
