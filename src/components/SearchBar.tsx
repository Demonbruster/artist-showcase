import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar = ({ value, onChange, placeholder = 'Search...' }: SearchBarProps) => {
  return (
    <InputGroup size="lg">
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.400" />
      </InputLeftElement>
      <Input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        bg="white"
        borderRadius="lg"
        _focus={{
          borderColor: 'brand.400',
          boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
        }}
      />
    </InputGroup>
  )
}

export default SearchBar

