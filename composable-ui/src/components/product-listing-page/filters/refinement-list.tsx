import { FunctionComponent } from 'react'
import { useRefinementList } from 'react-instantsearch-hooks-web'
import { useIntl } from 'react-intl'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  HStack,
  Button,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { RefinementListProps } from '@composable/types'

const REFINEMENTS_INITIAL_LIMIT = 6
const REFINEMENTS_SHOW_MORE_LIMIT = 10

export const RefinementList: FunctionComponent<RefinementListProps> = (
  props
) => {
  const { translationKey } = props
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
    useRefinementList({
      ...props,
      limit: REFINEMENTS_INITIAL_LIMIT,
      showMoreLimit: REFINEMENTS_SHOW_MORE_LIMIT,
      showMore: true,
    })
  const { formatMessage } = useIntl()

  if (items && items.length === 0) return null

  return (
    <AccordionItem w="full" border="none">
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              px={0}
              borderBottomWidth="2px"
              borderBottomColor="gray.200"
            >
              <Box flex="1" textAlign="left">
                {formatMessage({ id: translationKey })}
              </Box>
              {isExpanded ? (
                <MinusIcon fontSize="xs" />
              ) : (
                <AddIcon fontSize="xs" />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel px={0.5}>
            <UnorderedList listStyleType="none" mx={0}>
              {items.map((item) => (
                <ListItem key={item.label} mb={2}>
                  <HStack>
                    <Checkbox
                      aria-label={item.label}
                      isChecked={item.isRefined}
                      onChange={() => refine(item.value)}
                    />
                    <HStack
                      flexGrow={1}
                      justify="space-between"
                      fontSize="xs"
                      fontWeight="normal"
                    >
                      <label htmlFor={item.label}>
                        <Text textStyle={'Desktop/Body-S'}>{item.label}</Text>
                      </label>
                      <Text color="text-muted">{item.count}</Text>
                    </HStack>
                  </HStack>
                </ListItem>
              ))}
            </UnorderedList>
            {canToggleShowMore && (
              <Button
                variant="link"
                size="xs"
                mt={{ base: 5, lg: 'sm' }}
                color="shading"
                textDecoration="underline"
                fontWeight="extrabold"
                onClick={toggleShowMore}
              >
                {isShowingMore
                  ? formatMessage({ id: 'category.filters.action.viewLess' })
                  : formatMessage({ id: 'category.filters.action.viewMore' })}
              </Button>
            )}
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
