import { FieldError } from 'react-hook-form'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Input,
  InputProps,
  Text,
} from '@chakra-ui/react'

interface InputFieldProps {
  inputProps: InputProps
  label: string
  callToAction?: JSX.Element
  error?: FieldError
  formLabelProps?: FormLabelProps
  isRequired?: boolean
  caption?: string
}

export const InputField = ({
  inputProps,
  label,
  callToAction,
  error,
  formLabelProps,
  isRequired = false,
  caption,
}: InputFieldProps) => {
  const { name } = inputProps
  if (!name) {
    return null
  }

  return (
    <FormControl isInvalid={Boolean(error)} isRequired={isRequired}>
      <Flex justify="space-between">
        <FormLabel
          fontSize="sm"
          fontWeight={700}
          requiredIndicator={<Text as="span">*</Text>}
          {...formLabelProps}
        >
          {label}
        </FormLabel>
        {callToAction}
      </Flex>
      <Input {...inputProps} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
      {caption && <FormHelperText fontSize="xs">{caption}</FormHelperText>}
    </FormControl>
  )
}
