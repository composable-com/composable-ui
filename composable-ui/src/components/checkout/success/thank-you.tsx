import { Box, Button, Flex, Text, Container } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'

interface ThankYouProps {
  orderId: string
  confirmationEmailAddress?: string | null
}

export const ThankYou = ({
  orderId,
  confirmationEmailAddress,
}: ThankYouProps) => {
  const intl = useIntl()
  const router = useRouter()

  return (
    <Container maxW="container.md">
      <Flex direction="column" justifyContent="center" textAlign="center">
        <Text fontSize={{ base: 'lg', md: 'xxl' }} fontWeight="extrabold">
          {intl.formatMessage({ id: 'checkout.success.thankYou' })}
        </Text>
        <Text
          fontSize={{ base: 'lg', md: 'xxl' }}
          fontWeight="extrabold"
          mb="md"
        >
          <Text as="span">
            {intl.formatMessage({ id: 'checkout.success.orderInfo' }) + ' '}
          </Text>
          <Text as="span" color="primary">
            {orderId}
          </Text>
        </Text>
        <Text fontSize={{ base: 'base', md: 'lg' }} mb="lg">
          {intl.formatMessage(
            { id: 'checkout.success.orderReceived' },
            { email: confirmationEmailAddress }
          )}
        </Text>
        <Box>
          <Button
            bg={'text'}
            color={'white'}
            onClick={() => router.push('/')}
            width={{ base: '100%', sm: 'initial' }}
          >
            {intl.formatMessage({ id: 'action.continueShopping' })}
          </Button>
        </Box>
      </Flex>
    </Container>
  )
}
