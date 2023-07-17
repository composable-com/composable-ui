import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { NextSeo } from 'next-seo'
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react'
import { useCheckout } from 'hooks'

export const StepSuccess = () => {
  const intl = useIntl()
  const router = useRouter()
  const { response } = useCheckout()
  const title = intl.formatMessage({ id: 'checkout.success.title' })

  return (
    <Box>
      <NextSeo title={title} noindex nofollow />

      <SimpleGrid spacing={8}>
        <GridItem>
          <Heading fontSize="2xl" mb={{ base: '8', md: '12' }}>
            {title}
          </Heading>

          <div>
            <Stack spacing={'2rem'}>
              <Text>
                {intl.formatMessage({ id: 'checkout.success.orderReceived' })}
              </Text>
              <Text>
                {intl.formatMessage(
                  { id: 'checkout.success.info' },
                  {
                    orderId: response.checkout?.id,
                  }
                )}
              </Text>
              <Box>
                <Button onClick={() => router.push('/')}>
                  {intl.formatMessage({ id: 'action.continueToHome' })}
                </Button>
              </Box>
            </Stack>
          </div>
        </GridItem>
      </SimpleGrid>
    </Box>
  )
}
