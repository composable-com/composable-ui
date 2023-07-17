import { FieldError } from 'react-hook-form'
import {
  Box,
  BoxProps,
  Checkbox,
  CheckboxProps,
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Text,
} from '@chakra-ui/react'

interface CheckboxFieldProps {
  checkboxProps: CheckboxProps
  content: string
  contentProps?: BoxProps
  rootProps?: FormControlProps
  callToAction?: JSX.Element
  displayLabel?: boolean
  error?: FieldError
  formLabelProps?: FormLabelProps
  isRequired?: boolean
  label?: string
}

export const CheckboxField = ({
  rootProps,
  checkboxProps,
  content,
  contentProps,
  callToAction,
  error,
  formLabelProps,
  displayLabel = false,
  isRequired = false,
  label = '',
}: CheckboxFieldProps) => {
  const { name } = checkboxProps
  if (!name) {
    return null
  }

  return (
    <FormControl
      isInvalid={Boolean(error)}
      isRequired={isRequired}
      {...rootProps}
    >
      {displayLabel && (
        <Flex justify="space-between">
          <FormLabel height={{ base: '14px', md: '17px' }} {...formLabelProps}>
            {label}
          </FormLabel>
          {callToAction}
        </Flex>
      )}
      <Checkbox height={{ base: '1rem', md: '1.5rem' }} {...checkboxProps}>
        <Box {...contentProps}>
          {content}
          {isRequired && (
            <Box display={'inline-block'} color={'dangerMed'} fontSize={'1rem'}>
              &nbsp;*
            </Box>
          )}
        </Box>
      </Checkbox>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
