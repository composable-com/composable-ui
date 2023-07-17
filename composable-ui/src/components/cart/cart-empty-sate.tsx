import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { Stack, Text, Button, Icon } from '@chakra-ui/react'
import { IoCart } from 'react-icons/io5'

export const CartEmptyState = () => {
  const intl = useIntl()
  const router = useRouter()

  return (
    <Stack
      p={20}
      display="flex"
      flexDirection="column"
      alignItems="center"
      spacing={4}
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
        size={'lg'}
        onClick={() => router.push('/category/accessories')}
      >
        {intl.formatMessage({ id: 'action.continueShopping' })}
      </Button>
    </Stack>
  )
}
