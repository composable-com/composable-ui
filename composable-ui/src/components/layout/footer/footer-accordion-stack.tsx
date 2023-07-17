import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  AccordionProps,
  Box,
} from '@chakra-ui/react'
import { LinkStack } from './footer-link-stack'
import { MenuItem } from './index'

interface AccordionStackProps {
  item: MenuItem
  accordionProps: AccordionProps
}

export const AccordionStack = ({
  item,
  accordionProps,
}: AccordionStackProps) => {
  const label = item.label ?? ''
  return (
    <Accordion
      allowToggle
      width="100%"
      marginTop="0 !important"
      {...accordionProps}
    >
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton height="60px">
                <Box flex="1" textAlign="left" textStyle={'Desktop/S'}>
                  {label}
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {item.children?.map((_item) => (
                <LinkStack
                  key={`${_item.label}${item.href}`}
                  item={_item}
                  level={3}
                />
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
