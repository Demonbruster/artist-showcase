import { Box, Skeleton, VStack } from '@chakra-ui/react'

const SkeletonCard = () => {
  return (
    <Box bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm">
      <Skeleton height="0" paddingBottom="100%" />
      <VStack align="stretch" p={4} spacing={2}>
        <Skeleton height="20px" />
        <Skeleton height="16px" width="60%" />
        <Skeleton height="16px" width="40%" />
      </VStack>
    </Box>
  )
}

export default SkeletonCard

