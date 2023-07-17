import { useIntl } from 'react-intl'
import { Box, Button, Stack, Text, Flex } from '@chakra-ui/react'
import { useCheckout, useToast } from 'hooks'
import { FormGdpr } from './form-gdpr'
import { CHECKOUT_FORM_KEY } from '../constants'
import { Section, SectionHeader } from '@composable/ui'
import { FormShippingAddress } from './form-shipping-address'
import { ShippingOptions } from './shipping-options'
import { FormGuest } from './form-guest'
import { FormNewsletter } from './form-newsletter'

export interface Step1Props {
  onSubmit: () => void
}

export const Step1 = ({ onSubmit }: Step1Props) => {
  const intl = useIntl()
  const toast = useToast()
  const { checkoutState, setCheckoutState, validation, shippingOptions } =
    useCheckout()

  const handleSubmit = async () => {
    const validations = await Promise.all([
      validation.run(CHECKOUT_FORM_KEY.GUEST),
      validation.run(CHECKOUT_FORM_KEY.SHIPPING),
      validation.run(CHECKOUT_FORM_KEY.GDPR),
    ])

    if (validations.some((isValid) => !isValid)) {
      return
    }

    if (!shippingOptions.selected) {
      toast({
        status: 'error',
        description: intl.formatMessage({
          id: 'checkout.validation.missingShippingOption',
        }),
      })
      return
    }

    onSubmit()
  }

  return (
    <Stack gap={6}>
      <Section>
        <SectionHeader
          title={intl.formatMessage({
            id: 'checkout.delivery.confirmationEmailSection.title',
          })}
          textProps={{ fontSize: { base: 'base', md: 'xl' } }}
          requiredMarkText={intl.formatMessage({
            id: 'section.required',
          })}
        />
        <FormGuest
          initialValues={checkoutState.customer}
          onChange={({ data, isValid }) => {
            if (!isValid) return

            setCheckoutState((state) => {
              return {
                ...state,
                customer: data,
              }
            })
          }}
        />
        <Box mt={6}>
          <FormNewsletter />
        </Box>
      </Section>

      <Section>
        <SectionHeader
          title={intl.formatMessage({
            id: 'checkout.delivery.shippingAddressSection.title',
          })}
          textProps={{ fontSize: { base: 'base', md: 'xl' } }}
          requiredMarkText={intl.formatMessage({
            id: 'section.required',
          })}
        />
        <Box mb={10}>
          <FormShippingAddress
            initialValues={checkoutState.shipping_address}
            onChange={({ data, isValid }) => {
              if (!isValid) return
              setCheckoutState((state) => {
                return {
                  ...state,
                  shipping_address: data,
                }
              })
            }}
          />
        </Box>

        <SectionHeader
          title={intl.formatMessage({
            id: 'checkout.delivery.shippingSection.title',
          })}
          textProps={{ fontSize: { base: 'base', md: 'xl' } }}
        />
        <ShippingOptions />
      </Section>

      <Box px={{ base: 4, md: 'none' }}>
        <FormGdpr
          initialValues={{
            gdpr_consent: checkoutState.config.gdpr,
          }}
          onChange={({ data, isValid }) => {
            setCheckoutState((state) => {
              return {
                ...state,
                config: { ...state.config, gdpr: data.gdpr_consent },
              }
            })
          }}
        />
      </Box>

      <Flex justifyContent="flex-end" px={{ base: 4, md: 'none' }}>
        <Button
          fontSize="base"
          w={{ base: 'full', md: 'fit-content' }}
          variant="solid"
          onClick={() => handleSubmit()}
          isDisabled={!shippingOptions.selected}
        >
          <Text>{intl.formatMessage({ id: 'action.continuePayment' })}</Text>
        </Button>
      </Flex>
    </Stack>
  )
}
