import {
  CreateToastFnReturn,
  useToast as useChakraToast,
  UseToastOptions,
} from '@chakra-ui/react'

export const useToast = (options?: UseToastOptions): CreateToastFnReturn => {
  const toast = useChakraToast({
    position: 'top',
    duration: 3000,
    isClosable: true,
    ...options,
  })
  return toast
}
