import { HStack, Button, Text } from '@chakra-ui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import type { SortOrder } from '../types/domain'

interface SortControlsProps {
  sortOrder: SortOrder
  onSortChange: (order: SortOrder) => void
}

const SortControls = ({ sortOrder, onSortChange }: SortControlsProps) => {
  const getSortIcon = (order: SortOrder) => {
    if (sortOrder === order) {
      return order.includes('asc') ? <ChevronUpIcon /> : <ChevronDownIcon />
    }
    return null
  }

  const isActive = (order: SortOrder) => sortOrder === order

  return (
    <HStack spacing={3} flexWrap="wrap" bg="gray.50" p={3} borderRadius="xl">
      <Text fontSize="sm" color="gray.700" fontWeight="700">
        Sort by:
      </Text>

      <Button
        size="md"
        variant={isActive('name-asc') || isActive('name-desc') ? 'solid' : 'outline'}
        colorScheme="brand"
        rightIcon={getSortIcon('name-asc') || getSortIcon('name-desc') || undefined}
        onClick={() =>
          onSortChange(sortOrder === 'name-asc' ? 'name-desc' : 'name-asc')
        }
        borderRadius="xl"
        fontWeight="600"
        boxShadow={isActive('name-asc') || isActive('name-desc') ? 'md' : 'none'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        }}
        transition="all 0.3s ease"
      >
        Name
      </Button>

      <Button
        size="md"
        variant={isActive('year-asc') || isActive('year-desc') ? 'solid' : 'outline'}
        colorScheme="brand"
        rightIcon={getSortIcon('year-asc') || getSortIcon('year-desc') || undefined}
        onClick={() =>
          onSortChange(sortOrder === 'year-asc' ? 'year-desc' : 'year-asc')
        }
        borderRadius="xl"
        fontWeight="600"
        boxShadow={isActive('year-asc') || isActive('year-desc') ? 'md' : 'none'}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'md',
        }}
        transition="all 0.3s ease"
      >
        Year
      </Button>
    </HStack>
  )
}

export default SortControls

