import {
  Box,
  Button,
  ButtonProps,
  Collapse,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import { useIntl } from 'react-intl'

export interface SidebarAccordionProps {
  children: JSX.Element
  expanded?: Boolean
  icon?: JSX.Element
  label: string
  rootProps?: Omit<ButtonProps, 'children'>
}

export const SidebarAccordion = ({
  children,
  expanded,
  icon,
  label,
  rootProps,
}: SidebarAccordionProps) => {
  const { isOpen, onToggle } = useDisclosure()
  const intl = useIntl()
  return (
    <>
      <Button
        aria-label={intl.formatMessage({ id: 'account.dashboard.title' })}
        aria-expanded={isOpen}
        borderBottom={{ base: '1px solid #E2E2E2', md: 'none' }}
        borderRadius={'none'}
        display={'flex'}
        height={'48px'}
        justifyContent={'space-between'}
        onClick={onToggle}
        p={'16px'}
        variant={'unstyled'}
        {...rootProps}
      >
        <HStack spacing={'8px'} width={'full'} aria-hidden>
          {icon}
          <Text textStyle={'Desktop/Body-Default'}>{label}</Text>
        </HStack>
        {isOpen ? (
          <IoChevronDownOutline aria-hidden size={'24px'} />
        ) : (
          <IoChevronUpOutline aria-hidden size={'24px'} />
        )}
      </Button>

      <Collapse in={expanded ? !isOpen : isOpen} animateOpacity>
        <Box padding={'16px'}>{children}</Box>
      </Collapse>
    </>
  )
}
