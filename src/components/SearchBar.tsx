import { Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from '@chakra-ui/react'
import { Search2Icon, CloseIcon } from '@chakra-ui/icons'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="brand.400" />
      </InputLeftElement>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        bg="white"
        borderRadius="2xl"
        border="2px"
        borderColor="gray.200"
        fontSize="md"
        fontWeight="500"
        _placeholder={{
          color: 'gray.400',
          fontWeight: '400',
        }}
        _hover={{
          borderColor: 'brand.300',
        }}
        _focus={{
          borderColor: 'brand.400',
          boxShadow: '0 0 0 4px rgba(14, 165, 233, 0.1)',
          bg: 'white',
        }}
        transition="all 0.3s ease"
      />
      {value && (
        <InputRightElement>
          <IconButton
            aria-label="Clear search"
            icon={<CloseIcon />}
            size="sm"
            variant="ghost"
            colorScheme="gray"
            borderRadius="full"
            onClick={() => onChange('')}
          />
        </InputRightElement>
      )}
    </InputGroup>
  )
}

export default SearchBar

