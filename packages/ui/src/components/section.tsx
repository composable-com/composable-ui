import { Box, BoxProps, Flex, Text, TextProps } from '@chakra-ui/react'

interface SectionProps {
  boxProps?: BoxProps
  children: React.ReactNode
}

export const Section = ({ boxProps, children }: SectionProps) => {
  return (
    <Box
      direction={'column'}
      alignItems={'flex-start'}
      backgroundColor={'background'}
      padding={{ base: '2rem 1.5rem 2.5rem' }}
      {...boxProps}
    >
      {children}
    </Box>
  )
}

interface SectionHeaderProps {
  requiredMarkText?: string
  requiredMarkTextProps?: TextProps
  textProps?: TextProps
  boxProps?: BoxProps
  title?: string | JSX.Element
}

export const SectionHeader = ({
  requiredMarkText,
  requiredMarkTextProps,
  textProps,
  boxProps,
  title,
}: SectionHeaderProps) => {
  return (
    <Flex justify={'space-between'} marginBottom={'1.5rem'} {...boxProps}>
      {title && (
        <Text as="h2" textStyle={'Desktop/L'} {...textProps}>
          {title}
        </Text>
      )}
      {requiredMarkText && (
        <RequiredMark
          requiredMarkText={requiredMarkText}
          requiredMarkTextProps={requiredMarkTextProps}
        />
      )}
    </Flex>
  )
}

const RequiredMark = ({
  requiredMarkText,
  requiredMarkTextProps,
}: Pick<SectionHeaderProps, 'requiredMarkTextProps' | 'requiredMarkText'>) => {
  return (
    <Text textStyle={'Body-S'} color={'text-muted'} {...requiredMarkTextProps}>
      {requiredMarkText}
    </Text>
  )
}
