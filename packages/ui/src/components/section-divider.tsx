import { BoxProps, Divider, HStack, Text, TextProps } from '@chakra-ui/react'

export interface SectionDividerProps {
  text?: string
  textProps?: TextProps
  containerProps?: BoxProps
}

export const SectionDivider = ({
  text,
  textProps,
  containerProps,
}: SectionDividerProps) => {
  if (!text) {
    return <Divider {...containerProps} />
  }
  return (
    <HStack {...containerProps}>
      <Divider />
      <Text color={'text-muted'} {...textProps} whiteSpace="nowrap">
        {text}
      </Text>
      <Divider />
    </HStack>
  )
}
