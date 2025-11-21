import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { VStack, Heading, HStack, Box } from '@chakra-ui/react'
import Layout from '../components/Layout'
import AlbumGrid from '../components/AlbumGrid'
import SortControls from '../components/SortControls'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import { useArtistAlbums } from '../hooks'
import { useUIStore } from '../store/uiStore'
import { sortAlbums } from '../utils/sorting'

const ArtistPage = () => {
  const { artistName } = useParams<{ artistName: string }>()
  const { sortOrder, setSortOrder } = useUIStore()

  const {
    data: albums,
    isLoading,
    error,
  } = useArtistAlbums(artistName || '')

  // Memoize sorted albums to avoid unnecessary recalculations
  const sortedAlbums = useMemo(() => {
    if (!albums) return []
    return sortAlbums(albums, sortOrder)
  }, [albums, sortOrder])

  if (!artistName) {
    return (
      <Layout>
        <ErrorMessage title="Invalid Artist" message="No artist name provided" />
      </Layout>
    )
  }

  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" flexWrap="wrap" gap={4}>
          <Box>
            <Heading size="xl">{decodeURIComponent(artistName)}</Heading>
            {albums && (
              <Heading size="sm" color="gray.600" fontWeight="normal" mt={1}>
                {albums.length} {albums.length === 1 ? 'album' : 'albums'}
              </Heading>
            )}
          </Box>

          {albums && albums.length > 0 && (
            <SortControls sortOrder={sortOrder} onSortChange={setSortOrder} />
          )}
        </HStack>

        {isLoading && <LoadingSpinner message="Loading albums..." />}

        {error && (
          <ErrorMessage
            title="Failed to load albums"
            message={
              error instanceof Error
                ? error.message
                : 'Could not fetch artist albums'
            }
          />
        )}

        {!isLoading && !error && albums && (
          <AlbumGrid
            albums={sortedAlbums}
            emptyMessage="No albums found for this artist"
          />
        )}
      </VStack>
    </Layout>
  )
}

export default ArtistPage
