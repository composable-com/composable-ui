import { Box } from '@chakra-ui/react'
import { IoCartOutline } from 'react-icons/io5'

interface CartIconProps {
  cartQuantity?: number
}

export const CartIcon = (props: CartIconProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <IoCartOutline aria-hidden size={'26px'} />
      {Boolean(props.cartQuantity) && (
        <Box
          display="flex"
          transform="translate(12px, -10px)"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontSize="xs"
          fontWeight="bold"
          borderRadius="base"
          bg={props.cartQuantity ? 'red.500' : 'transparent'}
          padding="0 2px"
          minW="15px"
          w="fit-content"
          h="fit-content"
          position="absolute"
        >
          {props.cartQuantity ? props.cartQuantity : ''}
        </Box>
      )}
    </Box>
  )
}
