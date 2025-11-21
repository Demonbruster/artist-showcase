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
    <HStack spacing={2} flexWrap="wrap">
      <Text fontSize="sm" color="gray.600" fontWeight="medium">
        Sort by:
      </Text>

      <Button
        size="sm"
        variant={isActive('name-asc') || isActive('name-desc') ? 'solid' : 'outline'}
        colorScheme="brand"
        rightIcon={getSortIcon('name-asc') || getSortIcon('name-desc') || undefined}
        onClick={() =>
          onSortChange(sortOrder === 'name-asc' ? 'name-desc' : 'name-asc')
        }
      >
        Name
      </Button>

      <Button
        size="sm"
        variant={isActive('year-asc') || isActive('year-desc') ? 'solid' : 'outline'}
        colorScheme="brand"
        rightIcon={getSortIcon('year-asc') || getSortIcon('year-desc') || undefined}
        onClick={() =>
          onSortChange(sortOrder === 'year-asc' ? 'year-desc' : 'year-asc')
        }
      >
        Year
      </Button>
    </HStack>
  )
}

export default SortControls

