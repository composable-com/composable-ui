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

interface QuantityPicker extends UseControllableStateProps<number> {
  buttonProps?: Partial<IconButtonProps>
  hideLabel?: boolean
  isLoading?: boolean
  label?: string
  max?: number
  min?: number
  rootProps?: FormControlProps
}

export const QuantityPicker = (props: QuantityPicker) => {
  const {
    buttonProps,
    hideLabel,
    isLoading,
    label = 'Quantity',
    max,
    min = 0,
    rootProps,
    ...rest
  } = props

  const [value, setValue] = useControllableState(rest)
  const handleDecrement = () => setValue(value - 1)
  const handleIncrement = () => setValue(value + 1)

  return (
    <FormControl aria-label={`${label} selected is ${value}`} {...rootProps}>
      {hideLabel ? (
        <VisuallyHidden>
          <Text textStyle={'Desktop/S'}>
            <FormLabel>{label}</FormLabel>
          </Text>
        </VisuallyHidden>
      ) : (
        <FormLabel>
          <Text textStyle={'Desktop/S'}>{label}</Text>
        </FormLabel>
      )}
      <Flex
        borderRadius="base"
        px="2"
        py="0.4375rem"
        borderWidth="1px"
        justifyContent="space-between"
      >
        <QuantityPickerButton
          onClick={handleDecrement}
          icon={<FiMinus />}
          isDisabled={value <= min || isLoading}
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
          isDisabled={(max !== undefined && value >= max) || isLoading}
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
