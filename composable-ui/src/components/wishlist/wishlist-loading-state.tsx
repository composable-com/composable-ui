import { Box, Skeleton, Stack } from '@chakra-ui/react'

export const WishlistLoadingState = () => {
  return (
    <Stack spacing="8" divider={<Box h="1px" bg="gray.200" />}>
      {[1, 2, 3].map((i) => (
        <Stack key={i} spacing="4">
          <Skeleton height="100px" />
          <Stack direction="row" spacing="4">
            <Skeleton height="40px" width="100px" />
            <Skeleton height="40px" width="100px" />
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}
