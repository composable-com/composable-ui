import {
  Alert,
  AlertDescription,
  AlertDescriptionProps,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  CloseButton,
  CloseButtonProps,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

interface AlertBoxProps {
  alertDescriptionProps?: AlertDescriptionProps
  closeButtonProps?: CloseButtonProps
  description?: string | JSX.Element
  onClick?: () => void
  rootProps?: AlertProps
  title?: string
}

export const AlertBox = (props: AlertBoxProps) => {
  const {
    alertDescriptionProps,
    closeButtonProps,
    description,
    onClick,
    rootProps,
    title,
  } = props

  const bgValue = useColorModeValue('info.100', 'info.700')
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Alert status="info" bg={bgValue} {...rootProps}>
      <AlertIcon aria-hidden={'true'} />
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription
          textStyle={'Body-S'}
          color={'text'}
          onClick={() => onClick?.()}
          {...alertDescriptionProps}
        >
          {description}
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="center"
        position="relative"
        fontSize={'11.25px'}
        onClick={onClose}
        {...closeButtonProps}
      />
    </Alert>
  ) : null
}
