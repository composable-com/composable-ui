import { useEffect, useRef } from 'react'
import { useForm, UseFormProps, FieldValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCheckout } from 'hooks'

export interface UseCheckoutFormProps<T extends FieldValues> {
  initialValues: T
  formKey: string
  onChange: (event: { data: T; isValid: boolean }) => void
  yupSchema: yup.AnyObjectSchema
  hookFormProps?: UseFormProps<T>
}

export function useCheckoutForm<T extends FieldValues>({
  initialValues,
  onChange,
  yupSchema,
  formKey,
  hookFormProps,
}: UseCheckoutFormProps<T>) {
  const { validation } = useCheckout()
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const form = useForm<T>({
    resolver: yupResolver(yupSchema),
    mode: 'onTouched',
    shouldFocusError: true,
    // @ts-ignore-error
    defaultValues: initialValues,
    ...hookFormProps,
  })

  const { trigger, handleSubmit, watch } = form

  useEffect(() => {
    validation.register(formKey, () => {
      handleSubmit(() => null)() // hack to focus with `shouldFocusError: true`
      return trigger()
    })

    return () => validation.unregister(formKey)
  }, [formKey, handleSubmit, trigger, validation])

  useEffect(() => {
    const subscription = watch(async (values) => {
      const isValid = await yupSchema.isValid(values)
      const data = values as T
      onChangeRef.current({ data, isValid })
    })

    return () => subscription.unsubscribe()
  }, [watch, yupSchema, formKey])

  return {
    form,
  }
}
