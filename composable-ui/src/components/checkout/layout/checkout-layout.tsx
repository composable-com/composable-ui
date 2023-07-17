import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Section } from '@composable/ui'
import { CheckoutHeader } from './checkout-header'
import { OrderSummary } from '../order-summary'
import { BagSummaryMobile } from '../bag-summary-mobile'
import { useCheckoutSteps } from '../checkout-provider'
import { CHECKOUT_STEP_KEY } from '../constants'
import { PlaceOrderButton } from '../place-order-button'
import { Footer } from '../../layout/footer'
import { Logo } from '../../logo'
import { APP_CONFIG } from '../../../utils/constants'
import { cmsFooterLinks } from '../../layout/_data'

interface CheckoutLayoutProps {
  children: React.ReactElement
}

export const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
  const { step } = useCheckoutSteps()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const isReviewStep = step.key === CHECKOUT_STEP_KEY.STEP_3

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <CheckoutHeader />
      {isMobile && <BagSummaryMobile />}

      {isReviewStep && (
        <Container
          maxW="container.xl"
          my={8}
          display={{ base: 'block', md: 'none' }}
        >
          <PlaceOrderButton w={{ base: 'full' }} />
        </Container>
      )}
      <Container
        px={{ base: 0, md: '6' }}
        mb={'auto'}
        maxW="container.xl"
        pt={{ base: 0, md: 'xxl' }}
        pb={{ base: '4', md: 'xxl' }}
      >
        <Grid
          templateColumns={{ base: '1fr', md: 'auto 400px', lg: 'auto 505px' }}
          gap={8}
        >
          <GridItem>{children}</GridItem>
          <GridItem>
            <Section
              boxProps={{
                position: 'sticky',
                top: '12',
                padding: isMobile ? 2 : 6,
                backgroundColor: isMobile ? 'transparent' : 'background',
              }}
            >
              <OrderSummary
                itemsBoxProps={{
                  display: { base: 'none', md: 'block' },
                  px: { base: 4, md: 0 },
                }}
                showTitle={!isMobile}
              />
              {isReviewStep && !isMobile && (
                <Box mt={10}>
                  <PlaceOrderButton w={{ base: 'full' }} />
                </Box>
              )}
            </Section>
          </GridItem>
        </Grid>
      </Container>
      <Divider />
      <Footer
        brandLogo={<Logo h="21px" />}
        copyrightText={APP_CONFIG.COPYRIGHT}
        homeUrl={'/'}
        tagline={APP_CONFIG.TAG_LINE}
        parentMenuItems={cmsFooterLinks}
      />
    </Box>
  )
}
