import { Box, ButtonGroup, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaInstagramSquare, FaTwitter, FaYoutube } from 'react-icons/fa'

export interface CopyrightFooterProps {
  copyrightText?: string
}

export const CopyrightFooter = ({ copyrightText }: CopyrightFooterProps) => {
  return (
    <Stack
      pt="8"
      pb="12"
      justify="space-between"
      direction={{ base: 'column-reverse', md: 'row' }}
      align="center"
    >
      <Box>
        <Text fontSize="sm" color="subtle">
          {copyrightText}
        </Text>
      </Box>

      <ButtonGroup variant="ghost">
        <IconButton
          as="a"
          href="#"
          aria-label="Instagram"
          icon={<FaInstagramSquare fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="Twitter"
          icon={<FaTwitter fontSize="1.25rem" />}
        />
        <IconButton
          as="a"
          href="#"
          aria-label="YouTube"
          icon={<FaYoutube fontSize="1.25rem" />}
        />
      </ButtonGroup>
    </Stack>
  )
}
