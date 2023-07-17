import { IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

interface MegaDrawerBackButtonProps {
  onClick: () => void
}

export const MenuDrawerBackButton = ({
  onClick,
}: MegaDrawerBackButtonProps) => {
  return (
    <IconButton
      aria-label="open-drawer"
      variant="unstyled"
      position={'absolute'}
      marginTop="-0.25em"
      marginLeft="-0.25em"
      justifyContent="space-between"
      icon={<ArrowBackIcon width="1.25em" height="1.25em" onClick={onClick} />}
    />
  )
}
