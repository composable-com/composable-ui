import { Divider, Stack, useBreakpointValue } from '@chakra-ui/react'
import { HorizontalProductCardProps } from '@composable/ui'
import { CartItem } from '@composable/types'
import { ProductsList } from '../products-list'

interface OrderItemsProps {
  items: CartItem[]
}

export const OrderItems = ({ items }: OrderItemsProps) => {
  const productCartSize = useBreakpointValue({ base: 'sm', md: 'lg' })

  return (
    <Stack divider={<Divider />} spacing={2}>
      <ProductsList
        products={items}
        productCardProps={{
          columns: 4,
          size: productCartSize as HorizontalProductCardProps['size'],
        }}
      />
    </Stack>
  )
}
