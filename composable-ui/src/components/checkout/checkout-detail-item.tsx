import { useIntl } from 'react-intl'
import { Box, Flex, Text, Button, Icon } from '@chakra-ui/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

interface CheckoutDetailItemProps {
  title: string
  details?: string[]
  onClickEdit?: () => void
}

export const CheckoutDetailItem = ({
  title,
  details,
  onClickEdit,
}: CheckoutDetailItemProps) => {
  const intl = useIntl()
  return (
    <Flex gap="xs">
      <Box>
        <Icon as={AiOutlineCheckCircle} boxSize={5} />
      </Box>
      <Box flex={1} fontSize="sm">
        <Text fontWeight="extrabold">{title}</Text>
        {details?.map((detailLine, idx) => (
          <Text key={`${title}${detailLine}${idx}`}>{detailLine}</Text>
        ))}
      </Box>
      {onClickEdit && (
        <Box>
          <Button
            variant="link"
            size="sm"
            textDecoration="underline"
            textUnderlineOffset="4px"
            onClick={onClickEdit}
          >
            {intl.formatMessage({
              id: 'action.edit',
            })}
          </Button>
        </Box>
      )}
    </Flex>
  )
}
