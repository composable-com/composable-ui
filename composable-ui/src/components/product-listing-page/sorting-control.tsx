import { Flex, Text, Select } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useSortBy } from 'react-instantsearch-hooks-web'
import { ALGOLIA_SORTING_OPTIONS } from '../../utils/constants'

export const SortingControl = () => {
  const intl = useIntl()
  const { currentRefinement, refine, options } = useSortBy({
    items: ALGOLIA_SORTING_OPTIONS,
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value
    refine(selectValue)
  }

  return (
    <Flex direction="column">
      <Text as="label" htmlFor="indexSortSelect" fontSize="sm">
        {intl.formatMessage({ id: 'category.filters.sortBy' })}
      </Text>
      <Select
        id="indexSortSelect"
        fontSize="base"
        value={currentRefinement}
        onChange={(e) => handleChange(e)}
      >
        {options.map((item) => (
          <option
            key={item.label}
            style={{
              fontWeight: item.value === currentRefinement ? 'bold' : undefined,
            }}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
