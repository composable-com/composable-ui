import React, { useState } from 'react'
import { Alert, AlertIcon, Box, Button, CloseButton } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { InputField } from '@composable/ui'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCart } from '../../hooks'
export const VoucherForm = () => {
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<{ voucher: string }>({
    resolver: yupResolver(voucherFormSchema()),
    mode: 'all',
  })
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showAlert, setShowAlert] = useState(false)
  const { cart, addCartVoucher } = useCart({
    onCartVoucherAddError: (message) => {
      setErrorMessage(message || 'Could not add voucher')
      setShowAlert(true)
      const alertTimer = setTimeout(() => {
        setShowAlert(false)
      }, 3000)
      return () => clearTimeout(alertTimer)
    },
  })
  const content = {
    title: intl.formatMessage({ id: 'cart.summary.vouchers' }),
    input: {
      voucher: {
        label: intl.formatMessage({ id: 'cart.summary.label.voucher' }),
        placeholder: intl.formatMessage({
          id: 'cart.summary.label.voucher',
        }),
      },
    },
    button: {
      login: intl.formatMessage({ id: 'action.addVoucher' }),
    },
  }
  return (
    <form
      role={'form'}
      aria-label={content.title}
      onSubmit={handleSubmit(async (data) => {
        setErrorMessage('')
        if (!data.voucher) {
          setError('voucher', { message: 'This field cannot be empty.' })
          return
        }
        await addCartVoucher.mutate({
          cartId: cart.id || '',
          code: data.voucher,
        })
        setValue('voucher', '')
      })}
    >
      <Box
        display={'flex'}
        flexDirection={'row'}
        alignItems={'flex-start'}
        justifyContent={'center'}
        height={'3.7em'}
        gap={3}
      >
        <InputField
          inputProps={{
            size: 'sm',
            fontSize: 'sm',
            placeholder: content.input.voucher.placeholder,
            ...register('voucher'),
          }}
          error={errors.voucher}
          label={''}
        />
        <Button mt={2} type="submit" size="sm" variant={'outline'}>
          Apply
        </Button>
      </Box>
      {showAlert && errorMessage && (
        <Alert
          mt={1}
          status="warning"
          borderRadius={'6px'}
          p={'0.4rem'}
          m={'0'}
          fontSize={'13px'}
        >
          <AlertIcon alignSelf={'flex-center'} />
          {errorMessage}
          <CloseButton
            position="absolute"
            right="8px"
            top="2px"
            onClick={() => setShowAlert(false)}
          />
        </Alert>
      )}
    </form>
  )
}
const voucherFormSchema = () => {
  return yup.object().shape({
    voucher: yup.string(),
  })
}
