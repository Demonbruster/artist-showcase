import { useParams } from 'react-router-dom'
import {
  VStack,
  HStack,
  Box,
  Image,
  Heading,
  Text,
  Badge,
  Divider,
  Flex,
} from '@chakra-ui/react'
import Layout from '../components/Layout'
import TrackList from '../components/TrackList'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useAlbumDetails } from '../hooks'
import { formatPlayCount } from '../utils/formatters'

const AlbumDetailPage = () => {
  const { artist, albumName } = useParams<{ artist: string; albumName: string }>()

  const {
    data: album,
    isLoading,
    error,
  } = useAlbumDetails(artist || '', albumName || '')

  if (!artist || !albumName) {
    return (
      <Layout>
        <ErrorMessage
          title="Invalid Album"
          message="Album or artist information is missing"
        />
      </Layout>
    )
  }

  return (
    <Layout>
      {isLoading && <LoadingSpinner message="Loading album details..." />}

      {error && (
        <ErrorMessage
          title="Failed to load album"
          message={
            error instanceof Error ? error.message : 'Could not fetch album details'
          }
        />
      )}

      {!isLoading && !error && album && (
        <VStack spacing={8} align="stretch">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={10}
            bg="white"
            p={8}
            borderRadius="3xl"
            boxShadow="2xl"
            border="1px"
            borderColor="gray.100"
          >
            <Box flexShrink={0}>
              <Image
                src={album.coverImage}
                alt={album.name}
                boxSize={{ base: '100%', md: '320px' }}
                objectFit="cover"
                borderRadius="2xl"
                boxShadow="xl"
                fallbackSrc="https://via.placeholder.com/300x300?text=No+Image"
              />
            </Box>

            <VStack align="stretch" flex={1} justify="center" spacing={6}>
              <Box>
                <Badge 
                  colorScheme="brand" 
                  fontSize="md" 
                  mb={3}
                  px={4}
                  py={2}
                  borderRadius="full"
                  fontWeight="700"
                >
                  💿 Album
                </Badge>
                <Heading 
                  size="2xl" 
                  mb={3}
                  bgGradient="linear(to-r, brand.500, accent.500)"
                  bgClip="text"
                  fontWeight="800"
                >
                  {album.name}
                </Heading>
                <Heading size="lg" color="gray.600" fontWeight="600">
                  {album.artist}
                </Heading>
              </Box>

              <Divider />

              <HStack spacing={8} flexWrap="wrap">
                {album.year && (
                  <Box 
                    bg="brand.50" 
                    px={6} 
                    py={3} 
                    borderRadius="xl"
                  >
                    <Text fontSize="xs" color="gray.600" mb={1} fontWeight="600">
                      Year
                    </Text>
                    <Text fontWeight="700" fontSize="lg" color="brand.700">{album.year}</Text>
                  </Box>
                )}

                {album.tracks && (
                  <Box 
                    bg="accent.50" 
                    px={6} 
                    py={3} 
                    borderRadius="xl"
                  >
                    <Text fontSize="xs" color="gray.600" mb={1} fontWeight="600">
                      Tracks
                    </Text>
                    <Text fontWeight="700" fontSize="lg" color="accent.700">{album.tracks.length}</Text>
                  </Box>
                )}

                {album.listeners !== undefined && (
                  <Box 
                    bg="green.50" 
                    px={6} 
                    py={3} 
                    borderRadius="xl"
                  >
                    <Text fontSize="xs" color="gray.600" mb={1} fontWeight="600">
                      Listeners
                    </Text>
                    <Text fontWeight="700" fontSize="lg" color="green.700">
                      {formatPlayCount(album.listeners)}
                    </Text>
                  </Box>
                )}

                {album.totalPlaycount !== undefined && (
                  <Box 
                    bg="orange.50" 
                    px={6} 
                    py={3} 
                    borderRadius="xl"
                  >
                    <Text fontSize="xs" color="gray.600" mb={1} fontWeight="600">
                      Total Plays
                    </Text>
                    <Text fontWeight="700" fontSize="lg" color="orange.700">
                      {formatPlayCount(album.totalPlaycount)}
                    </Text>
                  </Box>
                )}
              </HStack>
            </VStack>
          </Flex>

          <Box 
            bg="white" 
            p={6} 
            borderRadius="2xl" 
            boxShadow="xl"
            border="1px"
            borderColor="gray.100"
          >
            <Heading size="lg" mb={6} color="gray.800" fontWeight="700">
              🎵 Tracklist
            </Heading>
            {album.tracks && album.tracks.length > 0 ? (
              <TrackList
                tracks={album.tracks}
                album={album.name}
                albumArtist={album.artist}
                showNavigation={false}
              />
            ) : (
              <Text color="gray.500">No tracks available</Text>
            )}
          </Box>
        </VStack>
      )}
    </Layout>
  )
}

export default AlbumDetailPage
