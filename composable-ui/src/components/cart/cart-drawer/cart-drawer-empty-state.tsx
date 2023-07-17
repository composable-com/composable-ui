import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { Text, Flex, Button, Icon } from '@chakra-ui/react'
import { IoCart } from 'react-icons/io5'

interface CartDrawerEmptyStateProps {
  onClose?: () => void
}

export const CartDrawerEmptyState = ({
  onClose,
}: CartDrawerEmptyStateProps) => {
  const intl = useIntl()
  const router = useRouter()

  return (
    <Flex
      direction="column"
      align="center"
      gap={4}
      my="80px"
      mx="auto"
      p={6}
      borderRadius="base"
      textAlign="center"
    >
      <Icon
        as={IoCart}
        w={{ base: '35px', md: '55px' }}
        h={{ base: '35px', md: '55px' }}
      />
      <Text textStyle={{ base: 'Desktop/S', md: 'Desktop/L' }}>
        {intl.formatMessage({ id: 'cart.emptyState.title' })}
      </Text>
      <Text textStyle={{ base: 'Desktop/Body-XS', md: 'Desktop/Body-Default' }}>
        {intl.formatMessage({ id: 'cart.emptyState.subtitle' })}
      </Text>
      <Button
        mt={6}
        variant={'ghost'}
        color={'text'}
        fontSize={{ base: '12px !important', md: '16px !important' }}
        onClick={async () => {
          await router.push('/category/accessories')
          onClose && onClose()
        }}
      >
        {intl.formatMessage({ id: 'action.continueShopping' })}
      </Button>
    </Flex>
  )
}
