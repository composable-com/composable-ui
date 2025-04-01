import { Box, Button, Stack, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'

export const WishlistEmptyState = () => {
  const intl = useIntl()
  const router = useRouter()

  return (
    <Stack
      spacing="4"
      align="center"
      justify="center"
      py={{ base: '8', md: '12' }}
    >
      <Text
        textStyle={{ base: 'Mobile/L', md: 'Desktop/L' }}
        color={'shading.700'}
      >
        {intl.formatMessage({ id: 'wishlist.empty.title' })}
      </Text>
      <Text
        textStyle={{ base: 'Mobile/Body-L', md: 'Desktop/Body-XL' }}
        color={'text-muted'}
        textAlign="center"
      >
        {intl.formatMessage({ id: 'wishlist.empty.description' })}
      </Text>
      <Button
        onClick={() => router.push('/')}
        variant="outline"
        size={{ base: 'sm', md: 'md' }}
      >
        {intl.formatMessage({ id: 'wishlist.empty.continueShopping' })}
      </Button>
    </Stack>
  )
}
