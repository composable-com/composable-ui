import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useCurrentRefinements } from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import { FilterIcon } from '@composable/ui'
import { FiltersCustomModal } from './filters-custom-modal'

export const MobileFilters = () => {
  const intl = useIntl()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { items } = useCurrentRefinements()
  const currentRefinementsCount = items.reduce(
    (prev, refinementAttribute) =>
      prev + refinementAttribute.refinements.length,
    0
  )

  return (
    <Flex width="full" direction="column">
      <Text as="label" htmlFor="btnMmobileFilters" fontSize="sm">
        {intl.formatMessage({ id: 'category.filters.refineBy' })}
      </Text>
      <Button
        id="btnMmobileFilters"
        variant="outline"
        onClick={onOpen}
        rightIcon={<FilterIcon ml="auto" />}
        iconSpacing="auto"
      >
        <Text fontWeight="normal" fontSize="base">
          {intl.formatMessage({ id: 'category.filters.filters' })}{' '}
          {currentRefinementsCount > 0 && `(${currentRefinementsCount})`}
        </Text>
      </Button>

      <FiltersCustomModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}
