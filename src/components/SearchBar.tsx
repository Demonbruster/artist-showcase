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
        borderRadius="lg"
        _hover={{
          borderColor: 'gray.300',
        }}
        _focus={{
          borderColor: 'brand.400',
          boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
          bg: 'white',
        }}
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

