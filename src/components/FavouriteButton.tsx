import { IconButton } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

interface FavouriteButtonProps {
  isFavourite: boolean
  onToggle: () => void
  size?: 'sm' | 'md' | 'lg'
}

const FavouriteButton = ({ isFavourite, onToggle, size = 'md' }: FavouriteButtonProps) => {
  return (
    <IconButton
      aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      icon={<StarIcon />}
      size={size}
      variant="ghost"
      colorScheme={isFavourite ? 'yellow' : 'gray'}
      color={isFavourite ? 'yellow.400' : 'gray.400'}
      onClick={e => {
        e.stopPropagation()
        onToggle()
      }}
      _hover={{
        color: isFavourite ? 'yellow.500' : 'yellow.400',
        bg: isFavourite ? 'yellow.50' : 'gray.100',
      }}
    />
  )
}

export default FavouriteButton

