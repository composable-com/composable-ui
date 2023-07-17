import { useIntl } from 'react-intl'
import { CartItem } from '@composable/types'
import {
  Box,
  Flex,
  HStack,
  Link,
  StackDivider,
  useBreakpointValue,
} from '@chakra-ui/react'

import { Price } from 'components/price'
import { QuantityPicker } from 'components/quantity-picker'
import { CartItemData } from '.'

interface CartItemWrapperProps {
  cartItem: CartItem
  onChangeQuantity?: (quantity: number) => void
  onDelete?: () => void
  isLoading?: boolean
}

export const CartItemWrapper = ({
  cartItem,
  onChangeQuantity,
  onDelete,
  isLoading,
}: CartItemWrapperProps) => {
  const intl = useIntl()
  const isMobile = useBreakpointValue({ base: true, md: false })

  return isMobile ? (
    <Box>
      <Flex>
        <CartItemData cartItem={cartItem} />
        <Price
          price={cartItem.price.toString()}
          rootProps={{ alignItems: 'flex-start', fontSize: 'sm' }}
        />
      </Flex>
      {onDelete && onChangeQuantity && (
        <HStack mt="2" justify="space-between">
          <HStack
            mt="2"
            fontSize="sm"
            fontWeight="medium"
            divider={<StackDivider />}
            spacing="3"
            color="blue.600"
          >
            <Link as="button" type="button" onClick={() => onDelete?.()}>
              {intl.formatMessage({ id: 'cart.item.delete.action' })}
            </Link>
          </HStack>
          <QuantityPicker
            rootProps={{ maxW: '200px ' }}
            isLoading={isLoading}
            value={cartItem.quantity}
            onChange={(val) => onChangeQuantity?.(val)}
            hideLabel
          />
        </HStack>
      )}
    </Box>
  ) : (
    <Flex align="flex-start" justify="space-between">
      <CartItemData cartItem={cartItem} />
      <HStack
        width="full"
        maxW="sm"
        justify="space-between"
        alignItems="flex-start"
      >
        {onChangeQuantity && (
          <QuantityPicker
            rootProps={{ maxW: '200px' }}
            isLoading={isLoading}
            value={cartItem.quantity}
            onChange={(val) => onChangeQuantity?.(val)}
          />
        )}
        <Flex
          direction="column"
          align="flex-end"
          justify="space-between"
          width="full"
          maxW="2xs"
          minH="16"
        >
          <Price price={cartItem.price.toString()} />
          {onDelete && (
            <Flex direction="column" align="center">
              <HStack
                mt="2"
                fontSize="sm"
                fontWeight="medium"
                divider={<StackDivider />}
                spacing="3"
                color="blue.600"
              >
                <Link
                  as="button"
                  type="button"
                  fontWeight="medium"
                  onClick={() => onDelete?.()}
                >
                  {intl.formatMessage({ id: 'cart.item.delete.action' })}
                </Link>
              </HStack>
            </Flex>
          )}
        </Flex>
      </HStack>
    </Flex>
  )
}
