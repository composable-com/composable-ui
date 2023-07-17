import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbProps as ChakraBreadcrumbProps,
} from '@chakra-ui/react'

export interface BreadcrumbItem {
  href: string
  label: string
}
export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  rootProps?: ChakraBreadcrumbProps
}

export const Breadcrumb = ({ items, rootProps }: BreadcrumbProps) => {
  return (
    <ChakraBreadcrumb
      textStyle={'Desktop/Body-Default'}
      color={'text-muted'}
      mb={'0.5rem'}
      {...rootProps}
    >
      {items.map((item, idx) => {
        return (
          <BreadcrumbItem
            key={item.label}
            isCurrentPage={idx + 1 === items.length}
          >
            <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </ChakraBreadcrumb>
  )
}
