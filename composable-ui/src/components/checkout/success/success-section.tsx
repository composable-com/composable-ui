import { Text } from '@chakra-ui/react'
import { Section, SectionHeader } from '@composable/ui'

interface SuccessSectionProps {
  title: string
  children: React.ReactNode
}

export const SuccessSection = ({ title, children }: SuccessSectionProps) => {
  return (
    <Section
      boxProps={{
        width: '100%',
        py: { base: 'md', lg: 10 },
        px: { base: 'sm', lg: 10 },
      }}
    >
      <SectionHeader title={<Text fontWeight="extrabold">{title}</Text>} />
      {children}
    </Section>
  )
}
