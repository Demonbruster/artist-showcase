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
            gap={8}
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="sm"
          >
            <Box flexShrink={0}>
              <Image
                src={album.coverImage}
                alt={album.name}
                boxSize={{ base: '100%', md: '300px' }}
                objectFit="cover"
                borderRadius="lg"
                fallbackSrc="https://via.placeholder.com/300x300?text=No+Image"
              />
            </Box>

            <VStack align="stretch" flex={1} justify="center" spacing={4}>
              <Box>
                <Badge colorScheme="brand" fontSize="sm" mb={2}>
                  Album
                </Badge>
                <Heading size="xl" mb={2}>
                  {album.name}
                </Heading>
                <Heading size="md" color="gray.600" fontWeight="normal">
                  {album.artist}
                </Heading>
              </Box>

              <Divider />

              <HStack spacing={8} flexWrap="wrap">
                {album.year && (
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Year
                    </Text>
                    <Text fontWeight="semibold">{album.year}</Text>
                  </Box>
                )}

                {album.tracks && (
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Tracks
                    </Text>
                    <Text fontWeight="semibold">{album.tracks.length}</Text>
                  </Box>
                )}

                {album.listeners !== undefined && (
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Listeners
                    </Text>
                    <Text fontWeight="semibold">
                      {formatPlayCount(album.listeners)}
                    </Text>
                  </Box>
                )}

                {album.totalPlaycount !== undefined && (
                  <Box>
                    <Text fontSize="sm" color="gray.600" mb={1}>
                      Total Plays
                    </Text>
                    <Text fontWeight="semibold">
                      {formatPlayCount(album.totalPlaycount)}
                    </Text>
                  </Box>
                )}
              </HStack>
            </VStack>
          </Flex>

          <Box>
            <Heading size="lg" mb={4}>
              Tracklist
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
