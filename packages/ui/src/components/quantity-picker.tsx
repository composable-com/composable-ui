import {
  Center,
  Flex,
  FormControl,
  FormControlProps,
  FormLabel,
  IconButton,
  IconButtonProps,
  Text,
  useControllableState,
  UseControllableStateProps,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FiMinus, FiPlus } from 'react-icons/fi'

interface QuantityPickerProps {
  buttonProps?: Partial<IconButtonProps>
  controllableStateProps: UseControllableStateProps<number>
  hideLabel?: boolean
  isLoading?: boolean
  label?: string
  max?: number
  min?: number
  rootProps?: FormControlProps
  size?: 'lg' | 'sm'
}

export const QuantityPicker = (props: QuantityPickerProps) => {
  const {
    min = 0,
    max,
    rootProps,
    isLoading,
    hideLabel,
    label = 'Quantity',
    buttonProps,
    controllableStateProps,
    size = 'lg',
  } = props

  const [value, setValue] = useControllableState(controllableStateProps)
  const handleDecrement = () => setValue(value === min ? value : value - 1)
  const handleIncrement = () => setValue(value === max ? value : value + 1)

  return (
    <FormControl aria-label={`${label} selected is ${value}`} {...rootProps}>
      {hideLabel ? (
        <VisuallyHidden>
          <FormLabel>{label}</FormLabel>
        </VisuallyHidden>
      ) : (
        <FormLabel fontSize="sm" fontWeight="medium">
          {label}
        </FormLabel>
      )}
      <Flex
        borderRadius="base"
        px="2"
        py={size === 'lg' ? '0.4375rem' : '0.2rem'}
        borderWidth="1px"
        justifyContent="space-between"
      >
        <QuantityPickerButton
          onClick={handleDecrement}
          icon={<FiMinus />}
          isDisabled={value === min || isLoading}
          aria-label="Decrement"
          {...buttonProps}
        />
        <Center minW="8">
          <Text as="span" fontWeight="semibold" userSelect="none">
            {value}
          </Text>
        </Center>
        <QuantityPickerButton
          onClick={handleIncrement}
          icon={<FiPlus />}
          isDisabled={value === max || isLoading}
          aria-label="Increment"
          {...buttonProps}
        />
      </Flex>
    </FormControl>
  )
}

const QuantityPickerButton = (props: IconButtonProps) => (
  <IconButton size="xs" fontSize="sm" variant="ghost" {...props} />
)
