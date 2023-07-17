import { Box, Container, Grid, GridItem, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useIntl } from 'react-intl'
import { CheckoutSteps } from './checkout-steps'
import { Logo } from '../../logo'

export const CheckoutHeader = () => {
  const intl = useIntl()

  return (
    <Box
      as="header"
      bg={'background'}
      p={{ base: '10px 0 0', md: 0 }}
      borderBottomWidth={{ base: '0', md: '1px' }}
    >
      <Container maxW="container.2xl" px={{ base: 0, md: 'sm' }}>
        <Grid
          gridTemplateAreas={{
            base: `"logo links" "steps steps"`,
            md: `"logo steps links"`,
          }}
          justifyContent="space-between"
          alignItems="center"
          minH={16}
        >
          <GridItem area="logo">
            <Box px={{ base: 'sm', md: 0 }} py={{ base: 'xs', md: 0 }}>
              <Link as={NextLink} href="/#" display="inline-block">
                <Logo h="21px" />
              </Link>
            </Box>
          </GridItem>
          <GridItem area="steps">
            <CheckoutSteps />
          </GridItem>
          <GridItem area="links">
            <Box alignSelf={'center'} display={{ base: 'none', md: 'block' }}>
              <Link
                as={NextLink}
                href="/cart"
                fontSize="sm"
                color="text"
                fontWeight="extrabold"
                textDecoration="underline"
              >
                {intl.formatMessage({ id: 'action.backToCart' })}
              </Link>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
