import { useCheckout } from 'hooks'
import { memo, useEffect } from 'react'
import { PAYMENT_METHOD } from '../constants'
import { useMutation } from '@tanstack/react-query'

export const OfflinePayment = memo(function OfflinePayment() {
  const {
    paymentHandler: { setOnConfirmOrder },
  } = useCheckout()

  const onConfirmOrderMutation = useMutation(
    ['offline-onConfirmOrder'],
    async () => {
      // Mock commerce provider response
    }
  )

  useEffect(() => {
    setOnConfirmOrder(PAYMENT_METHOD.CASH, onConfirmOrderMutation)
  }, [setOnConfirmOrder, onConfirmOrderMutation])

  return null
})
