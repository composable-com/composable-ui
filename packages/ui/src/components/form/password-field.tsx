import { forwardRef, useRef } from 'react'
import { FieldError } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react'

interface PasswordFieldProps {
  inputProps: Omit<InputProps, 'type'>
  label: string
  callToAction?: JSX.Element
  error?: FieldError
  formLabelProps?: FormLabelProps
  isRequired?: boolean
  messages: {
    password: {
      mask: string
      reveal: string
    }
  }
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      label,
      error,
      inputProps,
      callToAction,
      isRequired,
      formLabelProps,
      messages,
    },
    ref
  ) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)
    const mergeRef = useMergeRefs(inputRef, ref)
    const { name } = inputProps

    if (!name) {
      return null
    }

    const onClickReveal = () => {
      onToggle()
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true })
      }
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
        <InputGroup>
          <Input
            ref={mergeRef}
            name={name}
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            {...inputProps}
          />
          <InputRightElement>
            <IconButton
              bg="transparent !important"
              variant="ghost"
              aria-label={
                isOpen ? messages.password.mask : messages.password.reveal
              }
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{error?.message}</FormErrorMessage>
      </FormControl>
    )
  }
)

PasswordField.displayName = 'PasswordField'
