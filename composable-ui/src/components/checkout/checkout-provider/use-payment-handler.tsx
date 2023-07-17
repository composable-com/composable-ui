import { useCallback, useMemo, useRef, useState } from 'react'
import {
  PaymentMethodHandlerState,
  PaymentMethod,
  OnCapturePaymentDetailsMutation,
  OnConfirmOrderMutation,
} from './types'

export const usePaymentHandler = (): PaymentMethodHandlerState => {
  const [paymentMethods, setPaymentMethods] = useState<
    Record<string, PaymentMethod>
  >({})
  const [selectedKey, setSelectedKey] = useState<string>()
  const paymentMethodExtraDataRef = useRef<Record<string, any>>()
  const onCaptureMutationsRef =
    useRef<Record<string, OnCapturePaymentDetailsMutation>>()
  const onConfirmOrderMutationsRef =
    useRef<Record<string, OnConfirmOrderMutation>>()

  const selected = selectedKey
    ? {
        ...paymentMethods[selectedKey],
        onPaymentDetailsCapture: onCaptureMutationsRef.current?.[selectedKey],
        onConfirmOrder: onConfirmOrderMutationsRef.current?.[selectedKey],
      }
    : undefined

  const list = useMemo(() => Object.values(paymentMethods), [paymentMethods])

  const setOnCapturePaymentDetails = useCallback(
    (key: string, mutation: OnCapturePaymentDetailsMutation) => {
      onCaptureMutationsRef.current = {
        ...onCaptureMutationsRef.current,
        [key]: mutation,
      }
    },
    []
  )

  const setOnConfirmOrder = useCallback(
    (key: string, mutation: OnConfirmOrderMutation) => {
      onConfirmOrderMutationsRef.current = {
        ...onConfirmOrderMutationsRef.current,
        [key]: mutation,
      }
    },
    []
  )

  const setPaymentMethodExtraData = useCallback((data: Record<string, any>) => {
    paymentMethodExtraDataRef.current = data
  }, [])

  const register = useCallback(
    (paymentMethod: PaymentMethod) =>
      setPaymentMethods((state) => ({
        ...state,
        [paymentMethod.key]: paymentMethod,
      })),
    []
  )

  return {
    register,
    select: setSelectedKey,
    selected,
    list,
    setOnCapturePaymentDetails,
    setOnConfirmOrder,
    paymentMethodExtraData: paymentMethodExtraDataRef.current,
    setPaymentMethodExtraData,
  }
}
