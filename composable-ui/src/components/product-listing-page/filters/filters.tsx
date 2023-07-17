import { useState } from 'react'
import {
  Accordion,
  AccordionProps,
  ComponentWithAs,
  Button,
  Box,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { RefinementList } from './refinement-list'
import { NumericMenu } from './numeric-menu'
import { AlgoliaFilterItem } from '@composable/types'

const ALGOLIA_FILTERS: AlgoliaFilterItem[] = [
  {
    type: 'list',
    attribute: 'type',
    translationKey: 'category.refinements.type',
    operator: 'and',
  },
  {
    type: 'list',
    attribute: 'brand',
    translationKey: 'category.refinements.brand',
    operator: 'and',
  },
  {
    type: 'numeric',
    attribute: 'price',
    translationKey: 'category.refinements.price',
    items: [
      { label: 'Below $50', end: 50 },
      { label: '$50-$100', start: 50, end: 100 },
      { label: '$100-$150', start: 100, end: 150 },
      { label: '$150-$200', start: 150, end: 200 },
    ],
  },
]

export const Filters: ComponentWithAs<'div', AccordionProps> = (props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | number[]>([
    0, 1, 2,
  ])
  const intl = useIntl()

  const filtersIndexes = ALGOLIA_FILTERS.map((_, index) => index)
  const allFilterAreExpanded =
    expandedIndex instanceof Array &&
    expandedIndex.length === filtersIndexes.length

  const handleExpandButton = () => {
    if (allFilterAreExpanded) {
      return setExpandedIndex([])
    }
    return setExpandedIndex(filtersIndexes)
  }

  return (
    <>
      <Box mb={3.5}>
        <Button
          variant="link"
          size="sm"
          color="shading"
          textDecoration="underline"
          fontWeight="extrabold"
          onClick={handleExpandButton}
        >
          {allFilterAreExpanded
            ? intl.formatMessage({ id: 'category.filters.action.collapseAll' })
            : intl.formatMessage({ id: 'category.filters.action.expandAll' })}
        </Button>
      </Box>

      <Accordion
        allowMultiple={true}
        index={expandedIndex}
        onChange={(expandedIndex) => setExpandedIndex(expandedIndex)}
        {...props}
      >
        {ALGOLIA_FILTERS.map((refinement) => {
          if (refinement.type === 'numeric') {
            return <NumericMenu key={refinement.attribute} {...refinement} />
          } else if (refinement.type === 'list') {
            return <RefinementList key={refinement.attribute} {...refinement} />
          } else return null
        })}
      </Accordion>
    </>
  )
}
