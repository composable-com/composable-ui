import { Alert, Button, Box, VStack } from '@chakra-ui/react'
import { IntlShape, useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { InputField, TitleSection } from '@composable/ui'
import { api } from 'utils/api'
import { AccountPage } from '../account/account-drawer'

export interface ForgotPasswordFormProps {
  type?: AccountPage
}

export const ForgotPasswordForm = ({
  type = AccountPage.PAGE,
}: ForgotPasswordFormProps) => {
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({
    resolver: yupResolver(forgotPasswordFormSchema({ intl })),
    mode: 'all',
  })

  const resetPassword = api.commerce.resetPassword.useMutation()

  const content = {
    title: intl.formatMessage({ id: 'account.forgot.title' }),
    description:
      "Enter the email address associated with your account, and we'll send you a link to set a new password.",
    input: {
      email: {
        label: intl.formatMessage({ id: 'account.forgot.label.email' }),
        placeholder: intl.formatMessage({ id: 'account.login.label.email' }),
      },
    },
    button: {
      submit: intl.formatMessage({ id: 'account.forgot.action.submit' }),
    },
    alert: {
      success: intl.formatMessage({ id: 'account.forgot.success.message' }),
    },
  }

  return (
    <Box>
      <TitleSection
        type={type}
        title={content.title}
        description={content.description}
      />
      <Box mt={10}>
        <form
          role={'form'}
          aria-label={content.title}
          onSubmit={handleSubmit((data) => {
            resetPassword.mutate({
              email: data.email,
            })
          })}
        >
          {resetPassword.isSuccess && (
            <Alert my={4} status="success" borderRadius={'6px'}>
              {content.alert.success}
            </Alert>
          )}

          <VStack spacing={6} alignItems={'stretch'}>
            <InputField
              label={content.input.email.label}
              inputProps={{
                isReadOnly: false,
                placeholder: content.input.email.placeholder,
                ...register('email'),
              }}
              error={errors.email}
            />

            <Box mt="30px" display="flex" justifyContent="center">
              <Button
                variant={'solid'}
                type="submit"
                isDisabled={false}
                isLoading={false}
                width={'full'}
              >
                {content.button.submit}
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}

export const forgotPasswordFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),
  })
}
