import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface BreadcrumbProps {
  query: string
}

export const Breadcrumb = ({ query }: BreadcrumbProps) => {
  const intl = useIntl()
  return (
    <ChakraBreadcrumb fontSize="sm" color="text-muted">
      <BreadcrumbItem>
        <BreadcrumbLink href="/">
          {intl.formatMessage({ id: 'category.breadcrumb.home' })}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink textTransform="capitalize">{query}</BreadcrumbLink>
      </BreadcrumbItem>
    </ChakraBreadcrumb>
  )
}
