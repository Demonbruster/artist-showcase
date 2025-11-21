import { SimpleGrid } from '@chakra-ui/react'
import SkeletonCard from './SkeletonCard'

interface SkeletonLoaderProps {
  count?: number
}

const SkeletonLoader = ({ count = 6 }: SkeletonLoaderProps) => {
  return (
    <SimpleGrid
      columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
      spacing={{ base: 4, md: 6 }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </SimpleGrid>
  )
}

export default SkeletonLoader

