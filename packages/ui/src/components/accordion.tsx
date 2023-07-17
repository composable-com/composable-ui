import { Key, ReactNode } from 'react'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Accordion as ChackraAccordion,
  AccordionProps as ChackraAccordionProps,
  AccordionButton,
  AccordionButtonProps as ChackraAccordionButtonProps,
  AccordionItem,
  AccordionItemProps as ChackraAccordionItemProps,
  AccordionPanel,
  AccordionPanelProps as ChackraAccordionPanelProps,
  Box,
} from '@chakra-ui/react'

type DefaultStyleItemType = {
  fontSize: string
  height: string
  iconSize: string
}

type DefaultStylesTypes = {
  small: DefaultStyleItemType
  medium: DefaultStyleItemType
  large: DefaultStyleItemType
}

const DefaultStyles: DefaultStylesTypes = {
  small: {
    fontSize: 'sm',
    height: '11.25',
    iconSize: '11.25',
  },
  medium: {
    fontSize: 'base',
    height: '14',
    iconSize: '11.25',
  },
  large: {
    fontSize: 'lg',
    height: '15.5',
    iconSize: '11.25',
  },
}

interface ItemProps extends AccordionItemProps {
  defaultOpen: Boolean
}

export interface AccordionProps {
  accordionButtonProps?: ChackraAccordionButtonProps
  accordionItemProps?: ChackraAccordionItemProps
  accordionPanelProps?: ChackraAccordionPanelProps
  accordionProps?: ChackraAccordionProps
  items: ItemProps[]
  showLeftIcon?: boolean
  showRightIcon?: boolean
  size?: AccordionSize
}

export type AccordionItemProps = {
  label: string
  content?: ReactNode
  isDisabled?: boolean
  id: string
}

export type AccordionSize = 'small' | 'medium' | 'large'

export const Accordion = ({
  accordionButtonProps,
  accordionItemProps,
  accordionPanelProps,
  accordionProps,
  items = [],
  showLeftIcon = false,
  showRightIcon = true,
  size = 'medium',
}: AccordionProps) => {
  if (!items || items.length === 0) {
    return null
  }

  const defaultIndex = items.reduce(
    (arr: number[], item, idx) => (item.defaultOpen ? [...arr, idx] : arr),
    []
  )

  const renderLeftIcon = (fontSize: string) => (
    <AddIcon fontSize={fontSize} mr={4} />
  )

  const renderRightIcon = (isExpanded: boolean, fontSize: string) => {
    return isExpanded ? (
      <CloseIcon fontSize={fontSize} />
    ) : (
      <AddIcon fontSize={fontSize} />
    )
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <ChackraAccordion
        allowToggle
        width="100%"
        marginTop={0}
        defaultIndex={defaultIndex}
        {...accordionProps}
      >
        {items.map((item) => {
          return (
            <AccordionItem
              isDisabled={item?.isDisabled ?? false}
              key={item?.id}
              {...accordionItemProps}
            >
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton
                      height={DefaultStyles[size].height}
                      {...accordionButtonProps}
                    >
                      {showLeftIcon &&
                        renderLeftIcon(DefaultStyles[size].iconSize)}
                      <Box
                        flex="1"
                        textAlign="left"
                        textStyle={'Desktop/Default'}
                      >
                        {item?.label ?? ''}
                      </Box>
                      {showRightIcon &&
                        renderRightIcon(
                          isExpanded,
                          DefaultStyles[size].iconSize
                        )}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pb={4}
                    textStyle={'Desktop/Body-S'}
                    {...accordionPanelProps}
                  >
                    {item?.content ?? ''}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          )
        })}
      </ChackraAccordion>
    </Box>
  )
}
