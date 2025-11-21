import { useState, useMemo } from 'react'
import { VStack, Heading, HStack, Text, Button, Box } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import EmptyState from '../components/EmptyState'
import { useFavouritesStore } from '../store/favouritesStore'
import { useNavigate } from 'react-router-dom'
import { formatDuration } from '../utils/formatters'

const FavouritesPage = () => {
  const { favourites, removeFavourite, clearFavourites } = useFavouritesStore()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  // Filter favourites based on search query
  const filteredFavourites = useMemo(() => {
    if (!searchQuery) return favourites

    const query = searchQuery.toLowerCase()
    return favourites.filter(
      track =>
        track.name.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.album.toLowerCase().includes(query)
    )
  }, [favourites, searchQuery])

  const handleTrackClick = (albumArtist: string, album: string) => {
    navigate(`/album/${encodeURIComponent(albumArtist)}/${encodeURIComponent(album)}`)
  }

  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        <Box
          bg="white"
          p={8}
          borderRadius="xl"
          boxShadow="sm"
          mb={6}
          borderBottom="3px"
          borderColor="brand.500"
        >
          <HStack justify="space-between" flexWrap="wrap" gap={4}>
            <Box>
              <Heading 
                size="2xl"
                color="gray.900"
                fontWeight="700"
              >
                ⭐ Your Favourites
              </Heading>
              <Text color="gray.600" mt={2} fontSize="lg">
                {favourites.length} {favourites.length === 1 ? 'track' : 'tracks'} saved
              </Text>
            </Box>

            {favourites.length > 0 && (
              <Button
                size="md"
                colorScheme="red"
                variant="outline"
                leftIcon={<DeleteIcon />}
                onClick={clearFavourites}
                fontWeight="600"
              >
                Clear All
              </Button>
            )}
          </HStack>
        </Box>

        {favourites.length > 0 && (
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Filter your favourites..."
          />
        )}

        {favourites.length === 0 ? (
          <EmptyState
            title="No Favourites Yet"
            description="Start adding your favourite tracks from album details or search results"
            actionLabel="Discover Music"
            onAction={() => navigate('/')}
          />
        ) : filteredFavourites.length === 0 ? (
          <EmptyState
            title="No matches found"
            description="Try a different search term"
          />
        ) : (
          <VStack spacing={0} align="stretch" bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm" border="1px" borderColor="gray.200">
            {filteredFavourites.map((track, index) => (
              <Box
                key={`${track.name}-${track.artist}-${index}`}
                px={4}
                py={4}
                borderBottom={
                  index < filteredFavourites.length - 1 ? '1px' : 'none'
                }
                borderColor="gray.100"
                _hover={{ bg: 'gray.50' }}
                transition="background 0.2s"
              >
                <HStack spacing={4} align="start">
                  <VStack
                    align="stretch"
                    flex={1}
                    spacing={1}
                    minW={0}
                    cursor="pointer"
                    onClick={() => handleTrackClick(track.albumArtist, track.album)}
                  >
                    <Text fontWeight="semibold" noOfLines={1}>
                      {track.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={1}>
                      {track.artist}
                    </Text>
                    <Text fontSize="sm" color="gray.500" noOfLines={1}>
                      {track.album}
                    </Text>
                  </VStack>

                  <HStack spacing={4} flexShrink={0}>
                    <Text fontSize="sm" color="gray.600" minW="45px" textAlign="right">
                      {formatDuration(track.duration)}
                    </Text>

                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => removeFavourite(track.name, track.artist)}
                    >
                      Remove
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </VStack>
    </Layout>
  )
}

export default FavouritesPage
