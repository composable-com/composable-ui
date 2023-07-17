import { useIntl } from 'react-intl'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
} from '@chakra-ui/react'

export const StripeLoadingError = ({
  refetch,
}: {
  refetch: () => Promise<any>
}) => {
  const intl = useIntl()
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="30px" mr={0} />
      <AlertTitle mt={4} mb={1}>
        {intl.formatMessage({
          id: 'checkout.payment.stripe.loadingError',
        })}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        <Button onClick={() => refetch()} size="sm">
          {intl.formatMessage({
            id: 'checkout.payment.stripe.loadingErrorTryAgainButton',
          })}
        </Button>
      </AlertDescription>
    </Alert>
  )
}
