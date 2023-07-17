import { Text, VStack } from '@chakra-ui/react'

export interface TitleSectionProps {
  type: 'page' | 'drawer'
  title: string
  description: string
}

export const TitleSection = ({
  type,
  title,
  description,
}: TitleSectionProps) => {
  return (
    <>
      {type === 'page' ? (
        <VStack>
          <Text
            as={'h3'}
            textStyle={{ base: 'Mobile/M', md: 'Desktop/M' }}
            alignSelf={'center'}
          >
            {title}
          </Text>
          <Text
            textStyle={'Mobile/Body-Default'}
            alignSelf={'center'}
            textAlign={'center'}
          >
            {description}
          </Text>
        </VStack>
      ) : (
        <VStack alignItems={'flex-start'} spacing={0}>
          <Text
            as={'h3'}
            textStyle={{ base: 'Mobile/S', md: 'Desktop/M' }}
            mb={2}
          >
            {title}
          </Text>
          <Text textStyle={'Mobile/Body-Default'}>{description}</Text>
        </VStack>
      )}
    </>
  )
}
