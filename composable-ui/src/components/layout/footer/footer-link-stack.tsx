import { Link, Stack, Text } from '@chakra-ui/react'
import { MenuItem } from './index'
import NextLink from 'next/link'

export interface LinkStackProps {
  item: MenuItem
  level?: number
}

export const LinkStack = ({ item, level = 0 }: LinkStackProps) => {
  const label = item.label ?? ''
  const href = item.href ?? ''

  return (
    <Stack spacing="2" paddingLeft={level > 2 ? 0 : '20px'}>
      {!item.children?.length || item.children?.length === 0 ? (
        <Link
          as={NextLink}
          p={3}
          display="block"
          href={href}
          padding={0}
          textStyle={'Desktop/Body-S'}
          prefetch={false}
        >
          {label}
        </Link>
      ) : (
        <>
          <Text
            textStyle={'Desktop/M'}
            paddingBottom={level > 1 ? 0 : '10px'}
            paddingLeft={level > 1 ? 0 : '20px'}
          >
            {label}
          </Text>
          {item.children?.map((_item) => (
            <LinkStack
              key={`${_item.label}${_item.href}`}
              item={_item}
              level={level + 1}
            />
          ))}
        </>
      )}
    </Stack>
  )
}
