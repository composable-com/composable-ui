import * as yup from 'yup'
import { useIntl, IntlShape } from 'react-intl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField, PasswordField } from '@composable/ui'
import {
  Alert,
  AlertIcon,
  Link,
  Box,
  Button,
  Center,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { TitleSection } from '@composable/ui'
import { AccountForm, AccountPage } from '../account/account-drawer'
import NextLink from 'next/link'
import { useComposable, useToast } from 'hooks'
import { api } from 'utils/api'
import {
  nameRegex,
  lowercaseLettersRegex,
  uppercaseLettersRegex,
  specialCharacterRegex,
  numbersRegex,
} from 'utils/regex'
import { PASSWORD_MIN_LENGTH } from 'utils/constants'

export interface RegisterFormProps {
  type?: AccountPage
  setAccountFormToShow?: React.Dispatch<React.SetStateAction<AccountForm>>
}

export const RegisterForm = ({
  type = AccountPage.PAGE,
  setAccountFormToShow,
}: RegisterFormProps) => {
  const intl = useIntl()
  const toast = useToast()
  const router = useRouter()
  const { accountDrawer, menuDrawer } = useComposable()
  const createUser = api.commerce.createUser.useMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{
    firstName: string
    lastName: string
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
  }>({
    resolver: yupResolver(registerFormSchema({ intl })),
    mode: 'all',
  })

  const isLoading = false

  const content = {
    title: intl.formatMessage({ id: 'account.register.title' }),
    description: intl.formatMessage({ id: 'account.register.description' }),
    createAccount: intl.formatMessage({ id: 'action.createAccount' }),
    alreadyAMember: intl.formatMessage({
      id: 'account.register.label.alreadyAMember',
    }),
    input: {
      firstName: {
        label: intl.formatMessage({ id: 'account.register.label.firstName' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.firstName',
        }),
      },
      lastName: {
        label: intl.formatMessage({ id: 'account.register.label.lastName' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.lastName',
        }),
      },
      email: {
        label: intl.formatMessage({ id: 'account.register.label.email' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.emailAddress',
        }),
      },
      emailRepeat: {
        label: intl.formatMessage({ id: 'account.register.label.emailRepeat' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.emailAddress',
        }),
      },
      password: {
        label: intl.formatMessage({
          id: 'account.register.label.password',
        }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.password.placeholder',
        }),
      },
      passwordRepeat: {
        label: intl.formatMessage({
          id: 'account.register.label.passwordRepeat',
        }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.password.placeholder',
        }),
      },
    },
    button: {
      login: intl.formatMessage({ id: 'action.signIn' }),
    },
    createAccountStatus: {
      success: intl.formatMessage({
        id: 'account.register.success.message',
      }),
      error: intl.formatMessage({
        id: 'account.register.error.somethingWentWrong',
      }),
    },
  }

  return (
    <Box>
      <TitleSection
        type={type}
        title={content.title}
        description={content.description}
      />
      {createUser.isSuccess && (
        <Alert mt="30px" status="success" borderRadius={'6px'}>
          <AlertIcon alignSelf={'flex-start'} />
          {content.createAccountStatus.success}
        </Alert>
      )}
      {createUser.isError && (
        <Alert mt="30px" status="error" borderRadius={'6px'}>
          <AlertIcon alignSelf={'flex-start'} />
          {content.createAccountStatus.error}
        </Alert>
      )}
      <Box pt={10}>
        <form
          role={'form'}
          aria-label={content.title}
          onSubmit={handleSubmit((data) => {
            createUser.mutate(
              {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
              },
              {
                onSuccess: () => {
                  toast({
                    status: 'success',
                    title: content.title,
                    description: content.createAccountStatus.success,
                  })

                  router.push('/')
                  menuDrawer.onClose()
                  accountDrawer.onClose()
                },
                onError: (error) => {
                  const formErrors = JSON.parse(error.message)
                  for (const item of formErrors) {
                    setError(item.path[0], {
                      type: 'validate',
                      message: intl.formatMessage({
                        id: item.message,
                      }),
                    })
                  }
                },
              }
            )
          })}
        >
          <Stack spacing={4} direction="column">
            <InputField
              label={content.input.firstName.label}
              inputProps={{
                placeholder: content.input.firstName.placeholder,
                ...register('firstName'),
              }}
              error={errors.firstName}
              isRequired
            />
            <InputField
              label={content.input.lastName.label}
              inputProps={{
                placeholder: content.input.lastName.placeholder,
                ...register('lastName'),
              }}
              error={errors.lastName}
              isRequired
            />
            <InputField
              label={content.input.email.label}
              inputProps={{
                placeholder: content.input.email.placeholder,
                ...register('email'),
              }}
              error={errors.email}
              isRequired
            />
            <InputField
              label={content.input.emailRepeat.label}
              inputProps={{
                placeholder: content.input.emailRepeat.placeholder,
                ...register('emailRepeat'),
              }}
              error={errors.emailRepeat}
              isRequired
            />
            <PasswordField
              label={content.input.password.label}
              inputProps={{
                placeholder: content.input.password.placeholder,
                ...register('password'),
              }}
              error={errors.password}
              isRequired
              messages={{
                password: {
                  mask: intl.formatMessage({ id: 'action.passwordMask' }),
                  reveal: intl.formatMessage({ id: 'action.passwordReveal' }),
                },
              }}
            />
            <PasswordField
              label={content.input.passwordRepeat.label}
              inputProps={{
                placeholder: content.input.passwordRepeat.placeholder,
                ...register('passwordRepeat'),
              }}
              error={errors.passwordRepeat}
              isRequired
              messages={{
                password: {
                  mask: intl.formatMessage({ id: 'action.passwordMask' }),
                  reveal: intl.formatMessage({ id: 'action.passwordReveal' }),
                },
              }}
            />
          </Stack>

          <Box mt="30px" display="flex" justifyContent="center">
            <Button
              type="submit"
              isLoading={isLoading}
              colorScheme="blue"
              width={'full'}
            >
              {content.createAccount}
            </Button>
          </Box>
        </form>

        <Center mt={4}>
          <HStack fontSize="sm" fontWeight="extrabold">
            <Text>{content.alreadyAMember}</Text>
            {type === AccountPage.PAGE ? (
              <Link as={NextLink} passHref href={'/'}>
                <Box
                  as="a"
                  textDecorationLine={'underline'}
                  textUnderlineOffset={4}
                >
                  {content.button.login}
                </Box>
              </Link>
            ) : (
              <Button
                color={'text'}
                fontSize="sm"
                fontWeight="extrabold"
                margin={'auto'}
                textDecorationLine={'underline'}
                textUnderlineOffset={4}
                variant={'link'}
                onClick={() => setAccountFormToShow?.('login')}
              >
                {content.button.login}
              </Button>
            )}
          </HStack>
        </Center>
      </Box>
    </Box>
  )
}

const registerFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    firstName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' }))
      .matches(
        nameRegex,
        intl.formatMessage({ id: 'validation.pleaseEnterAValidName' })
      ),
    lastName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.lastNameRequired' }))
      .matches(
        nameRegex,
        intl.formatMessage({ id: 'validation.pleaseEnterAValidName' })
      ),
    email: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.emailRequired' }))
      .email(intl.formatMessage({ id: 'validation.emailValid' })),
    emailRepeat: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.emailRepeat' }))
      .oneOf(
        [yup.ref('email'), null],
        intl.formatMessage({ id: 'validation.emailRepeatMatches' })
      ),
    password: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRequired' }))
      .min(
        PASSWORD_MIN_LENGTH,
        intl.formatMessage({ id: 'validation.passwordMinLength' })
      )
      .matches(
        lowercaseLettersRegex,
        intl.formatMessage({ id: 'validation.passwordLowercase' })
      )
      .matches(
        uppercaseLettersRegex,
        intl.formatMessage({ id: 'validation.passwordUppercase' })
      )
      .matches(
        numbersRegex,
        intl.formatMessage({ id: 'validation.passwordNumbers' })
      )
      .matches(
        specialCharacterRegex,
        intl.formatMessage({ id: 'validation.passwordSpecialCharacter' })
      ),
    passwordRepeat: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRepeat' }))
      .oneOf(
        [yup.ref('password'), null],
        intl.formatMessage({ id: 'validation.passwordRepeatMatches' })
      ),
  })
}
