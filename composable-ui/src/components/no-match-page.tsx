import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { useIntl } from 'react-intl'
import { Box, Heading, Button, Text } from '@chakra-ui/react'

export const NoMatchPage = () => {
  const intl = useIntl()
  const router = useRouter()
  const title = intl.formatMessage({ id: 'noMatchPage.title' })

  return (
    <Box py="10">
      <NextSeo title={title} noindex nofollow />

      <Box
        height="380px"
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading mb={3}>{title}</Heading>
        <Text>{intl.formatMessage({ id: 'noMatchPage.description' })}</Text>
        <Box mt={6}>
          <Button variant="solid" onClick={() => router.push('/')}>
            {intl.formatMessage({ id: 'action.continueShopping' })}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
