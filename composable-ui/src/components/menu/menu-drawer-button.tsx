import { RefObject } from 'react'
import { Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

interface MegaMenuButtonProps {
  label: string
  onOpen: () => void
  btnRef: RefObject<HTMLButtonElement>
}

export const MenuDrawerButton = ({
  label,
  onOpen,
  btnRef,
}: MegaMenuButtonProps) => {
  return (
    <Button
      aria-label="open-drawer"
      ref={btnRef}
      onClick={onOpen}
      variant="unstyled"
      width="100%"
      display="flex"
      justifyContent="space-between"
    >
      {label}
      <ArrowForwardIcon />
    </Button>
  )
}
