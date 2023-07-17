import {
  Divider,
  Skeleton,
  SkeletonText,
  Box,
  BoxProps,
} from '@chakra-ui/react'

interface CartLoadingStateProps {
  rootProps?: BoxProps
}

export const CartLoadingState = ({ rootProps }: CartLoadingStateProps) => {
  return (
    <Box my={{ base: '8', md: '12' }} {...rootProps}>
      <Box display="flex">
        <Skeleton width="200px" height="110px" />
        <Skeleton flex="1" height="110px" ml="20px" />
      </Box>

      <Divider my="40px" />

      <Box display="flex" justifyContent="flex-end">
        <Box>
          <SkeletonText width="360px" />
          <SkeletonText width="360px" my="20px" />
        </Box>
      </Box>
    </Box>
  )
}
