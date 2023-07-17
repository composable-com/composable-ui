import { Flex, Text } from '@chakra-ui/react'
import { useInfiniteHits } from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'

export const ResultsData = () => {
  const intl = useIntl()
  const { hits } = useInfiniteHits()

  return (
    <Flex direction="column">
      <Text fontSize={{ base: 'xs', lg: 'base' }} fontWeight="normal">
        {intl.formatMessage({
          id: 'category.results.displaying',
        })}
      </Text>

      <Text
        fontSize={{ base: 'base', lg: 'lg' }}
        fontWeight="normal"
        color="text-muted"
      >
        {`${intl.formatMessage(
          {
            id: 'category.results.itemCount',
          },
          { itemCount: hits?.length ?? 0 }
        )}`}
      </Text>
    </Flex>
  )
}
