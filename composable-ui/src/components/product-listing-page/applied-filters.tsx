import { Button, Flex } from '@chakra-ui/react'
import {
  useCurrentRefinements,
  useClearRefinements,
} from 'react-instantsearch-hooks-web'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useIntl } from 'react-intl'

export const AppliedFilters = () => {
  const intl = useIntl()
  const { items: refinementAttributes, refine: clearSingleRefinement } =
    useCurrentRefinements()
  const { canRefine: isRefined, refine: clearAllRefinements } =
    useClearRefinements()

  if (!isRefined) {
    return null
  }

  return (
    <Flex gap={2} wrap="wrap" mt={{ base: 4, lg: 6 }} mb={{ base: 0, lg: 6 }}>
      {refinementAttributes?.map((attribute) =>
        attribute?.refinements?.map((refinement) => (
          <RefinementChip
            key={`${attribute.label}-${refinement.label}`}
            label={refinement.label.toString()}
            clearRefinement={() => clearSingleRefinement(refinement)}
          />
        ))
      )}
      <Button
        variant="link"
        color="shading"
        ml="xxs"
        textDecoration="underline"
        textStyle={'Desktop/S'}
        onClick={clearAllRefinements}
      >
        {intl.formatMessage({ id: 'category.filters.action.clear' })}
      </Button>
    </Flex>
  )
}

interface RefinementChipProps {
  label: string
  clearRefinement: () => void
}

const RefinementChip = ({ label, clearRefinement }: RefinementChipProps) => {
  return (
    <Button
      variant="outline"
      rightIcon={<SmallCloseIcon />}
      paddingY="xxs"
      height={8}
      textStyle={'Desktop/S'}
      onClick={clearRefinement}
    >
      {label}
    </Button>
  )
}
