import { Fragment } from 'react'
import {
  Box,
  Container,
  Divider,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { CopyrightFooter } from './footer-copyright'
import { AccordionStack } from './footer-accordion-stack'
import { LinkStack } from './footer-link-stack'

export interface Menu {
  items: Array<MenuItem>
  title: string
}

export interface MenuItem {
  children?: Array<MenuItem>
  description?: string
  height?: number
  href?: string
  images?: {
    url: string
    name: string
  }
  label: string
  row1?: Array<MenuItem>
  row2?: Array<MenuItem>
  variant?: string
}

export interface FooterProps {
  brandLogo?: React.ReactNode
  copyrightText?: string
  homeUrl: string
  message?: React.ReactNode
  parentMenuItems?: Menu | null
  tagline?: string
}

export const Footer = ({
  brandLogo,
  copyrightText,
  homeUrl,
  parentMenuItems,
  tagline,
  message = null,
}: FooterProps) => {
  return (
    <Box borderTopWidth="1px">
      <Container as="footer" role="contentinfo" maxW="container.xl">
        <Stack
          justify="space-around"
          align="start"
          direction={{ base: 'column', md: 'row' }}
          py={{ base: '12', md: '16' }}
        >
          <Stack spacing={{ base: '4' }} align="start" paddingBottom="md">
            {brandLogo && (
              <Link as={NextLink} href={homeUrl}>
                {brandLogo}
              </Link>
            )}
            {tagline && <Text textStyle={'Desktop/Body-S'}>{tagline}</Text>}
            {message}
          </Stack>

          {parentMenuItems?.items.map((item, idx) => (
            <Fragment key={`${item.label}`}>
              <AccordionStack
                item={item}
                accordionProps={{ display: { base: 'block', md: 'none' } }}
              />
              <SimpleGrid paddingY={10} display={{ base: 'none', md: 'grid' }}>
                <LinkStack item={item} level={1} />
              </SimpleGrid>
            </Fragment>
          ))}
        </Stack>
        <Divider />
        <CopyrightFooter copyrightText={copyrightText} />
      </Container>
    </Box>
  )
}
