import { FieldError } from 'react-hook-form'
import {
  Textarea,
  FormControl,
  FormErrorMessage,
  FormLabel,
  TextareaProps,
  Flex,
  FormLabelProps,
} from '@chakra-ui/react'

interface TextareaFieldProps {
  inputProps: TextareaProps
  label: string
  callToAction?: JSX.Element
  error?: FieldError
  formLabelProps?: FormLabelProps
  isRequired?: boolean
}

export const TextareaField = ({
  label,
  error,
  inputProps,
  callToAction,
  formLabelProps,
  isRequired = false,
}: TextareaFieldProps) => {
  const { name } = inputProps
  if (!name) {
    return null
  }

  return (
    <FormControl isInvalid={Boolean(error)} isRequired={isRequired}>
      <Flex justify="space-between">
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        {callToAction}
      </Flex>
      <Textarea {...inputProps} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
