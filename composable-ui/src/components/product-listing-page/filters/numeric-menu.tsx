import React, { FunctionComponent } from 'react'
import {
  useNumericMenu,
  useClearRefinements,
} from 'react-instantsearch-hooks-web'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

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
} from '@chakra-ui/react'
import { NumericMenuProps } from '@composable/types'

export const NumericMenu: FunctionComponent<NumericMenuProps> = (props) => {
  const { formatMessage } = useIntl()
  const { translationKey, attribute } = props
  const { items, refine } = useNumericMenu(props)
  const { refine: clearRefine } = useClearRefinements({
    includedAttributes: [attribute],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    if (e.target.checked) {
      refine(item)
    } else {
      clearRefine()
    }
  }

  return (
    <AccordionItem w="100%" border="none">
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              px={0}
              borderBottom="2px solid var(--chakra-colors-gray-200)"
            >
              <Box flex="1" textAlign="left">
                <Text>{formatMessage({ id: translationKey })}</Text>
              </Box>
              {isExpanded ? (
                <MinusIcon color="inherit" fontSize="xs" />
              ) : (
                <AddIcon color="inherit" fontSize="xs" />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel px={0.5}>
            <UnorderedList listStyleType="none" mx={0}>
              {items.map((item) => {
                return (
                  <ListItem key={item.label}>
                    <Box w="100%">
                      <Checkbox
                        colorScheme="shading"
                        isChecked={item.isRefined}
                        onChange={(e) => handleChange(e, item.value)}
                      >
                        <Text textStyle={'Desktop/Body-S'}>{item.label}</Text>
                      </Checkbox>
                    </Box>
                  </ListItem>
                )
              })}
            </UnorderedList>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
