import { Box, Flex, Radio, Text } from '@chakra-ui/react'

interface ShippingOptionProps {
  id: string
  name: string
  description?: string
  selected?: boolean
  onSelect: () => void
}

export const ShippingOption = (props: ShippingOptionProps) => {
  const { id, name, description, selected = false, onSelect } = props
  return (
    <Flex
      p="sm"
      gap="sm"
      alignItems="center"
      border="1px solid"
      borderColor={selected ? 'primary' : 'muted'}
      onClick={onSelect}
      cursor="pointer"
    >
      <Box>
        <Radio
          value={id}
          size="lg"
          isChecked={selected}
          inputProps={{ 'aria-label': name }}
        />
      </Box>
      <Box fontSize="sm" flex={1}>
        <Text fontWeight="extrabold">{name}</Text>
        <Text color="text-muted">{description}</Text>
      </Box>
    </Flex>
  )
}
