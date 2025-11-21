import { memo } from 'react'
import { Box, HStack, Text, IconButton, Flex } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import type { Track } from '../types/domain'
import { formatDuration } from '../utils/formatters'
import { useFavouritesStore } from '../store/favouritesStore'

interface TrackListItemProps {
  track: Track
  trackNumber: number
  album: string
  albumArtist: string
  onTrackClick?: () => void
}

const TrackListItem = memo(
  ({ track, trackNumber, album, albumArtist, onTrackClick }: TrackListItemProps) => {
    const { addFavourite, removeFavourite, isFavourite } = useFavouritesStore()
    const isTrackFavourite = isFavourite(track.name, track.artist)

    const handleToggleFavourite = (e: React.MouseEvent) => {
      e.stopPropagation()

      if (isTrackFavourite) {
        removeFavourite(track.name, track.artist)
      } else {
        addFavourite({
          ...track,
          album,
          albumArtist,
          addedAt: Date.now(),
        })
      }
    }

    return (
      <Flex
        align="center"
        px={5}
        py={4}
        _hover={{ 
          bg: 'brand.50',
          transform: 'translateX(4px)',
          '&::before': {
            transform: 'scaleY(1)',
          },
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        cursor={onTrackClick ? 'pointer' : 'default'}
        onClick={onTrackClick}
        borderBottom="1px"
        borderColor="gray.100"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          bg: 'brand.500',
          transform: 'scaleY(0)',
          transition: 'transform 0.3s ease',
        }}
      >
        <Text
          w="40px"
          fontSize="sm"
          color="gray.500"
          fontWeight="medium"
          flexShrink={0}
        >
          {trackNumber}
        </Text>

        <Box flex={1} minW={0} mr={4}>
          <Text fontWeight="medium" noOfLines={1} fontSize="sm">
            {track.name}
          </Text>
          {track.artist !== albumArtist && (
            <Text fontSize="xs" color="gray.600" noOfLines={1}>
              {track.artist}
            </Text>
          )}
        </Box>

        <HStack spacing={4} flexShrink={0}>
          <Text fontSize="sm" color="gray.600" minW="45px" textAlign="right">
            {formatDuration(track.duration)}
          </Text>

          <IconButton
            aria-label={isTrackFavourite ? 'Remove from favourites' : 'Add to favourites'}
            icon={<StarIcon />}
            size="sm"
            variant="ghost"
            colorScheme={isTrackFavourite ? 'yellow' : 'gray'}
            color={isTrackFavourite ? 'yellow.400' : 'gray.400'}
            onClick={handleToggleFavourite}
            borderRadius="full"
            _hover={{
              color: isTrackFavourite ? 'yellow.500' : 'yellow.400',
              transform: 'scale(1.2) rotate(72deg)',
              bg: isTrackFavourite ? 'yellow.50' : 'yellow.50',
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          />
        </HStack>
      </Flex>
    )
  }
)

TrackListItem.displayName = 'TrackListItem'

export default TrackListItem

