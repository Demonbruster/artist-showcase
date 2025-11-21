import { Box, VStack, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import TrackListItem from './TrackListItem'
import type { Track } from '../types/domain'

interface TrackListProps {
  tracks: Track[]
  album: string
  albumArtist: string
  showNavigation?: boolean
}

const TrackList = ({
  tracks,
  album,
  albumArtist,
  showNavigation = false,
}: TrackListProps) => {
  const navigate = useNavigate()

  if (tracks.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Text color="gray.500">No tracks available</Text>
      </Box>
    )
  }

  return (
    <VStack spacing={0} align="stretch" bg="white" borderRadius="lg" overflow="hidden">
      {tracks.map((track, index) => (
        <TrackListItem
          key={`${track.name}-${index}`}
          track={track}
          trackNumber={index + 1}
          album={album}
          albumArtist={albumArtist}
          onTrackClick={
            showNavigation
              ? () =>
                  navigate(
                    `/album/${encodeURIComponent(albumArtist)}/${encodeURIComponent(album)}`
                  )
              : undefined
          }
        />
      ))}
    </VStack>
  )
}

export default TrackList

