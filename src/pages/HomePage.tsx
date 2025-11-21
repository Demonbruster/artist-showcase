import { useState } from 'react'
import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  Box,
  HStack,
  Button,
  Badge,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import AlbumGrid from '../components/AlbumGrid'
import TrackList from '../components/TrackList'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { useTrackSearch, useAlbumSearch } from '../hooks'

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const {
    data: tracks,
    isLoading: isLoadingTracks,
    error: tracksError,
  } = useTrackSearch(searchQuery)

  const {
    data: albums,
    isLoading: isLoadingAlbums,
    error: albumsError,
  } = useAlbumSearch(searchQuery)

  const handleSearchAsArtist = () => {
    if (searchQuery.trim()) {
      navigate(`/artist/${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <Layout>
      <VStack spacing={8} align="stretch">
        <Box 
          textAlign="center" 
          py={8}
          px={4}
          bg="white"
          borderRadius="xl"
          boxShadow="sm"
        >
          <Heading 
            size="2xl" 
            mb={3}
            color="gray.900"
            fontWeight="700"
          >
            Discover Amazing Music
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Search for songs, albums, or explore artists
          </Text>
        </Box>

        <Box>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for tracks, albums, or artists..."
          />
          
          {searchQuery.length > 0 && searchQuery.length < 3 && (
            <Text color="gray.500" textAlign="center" fontSize="sm" mt={3}>
              Type at least 3 characters to search
            </Text>
          )}

          {searchQuery.length >= 3 && (
            <HStack mt={4} spacing={3} justify="center">
              <Text fontSize="sm" color="gray.600">
                Not finding what you need?
              </Text>
              <Button
                size="sm"
                variant="outline"
                colorScheme="brand"
                onClick={handleSearchAsArtist}
              >
                Search as Artist Name →
              </Button>
            </HStack>
          )}
        </Box>

        {searchQuery.length >= 3 && (
          <Tabs colorScheme="brand" variant="enclosed" bg="white" p={6} borderRadius="xl" boxShadow="sm">
            <TabList mb={6}>
              <Tab 
                fontWeight="600"
                _selected={{ 
                  color: 'brand.600',
                  borderColor: 'brand.600',
                  borderBottomColor: 'white'
                }}
              >
                🎵 Tracks {tracks && `(${tracks.length})`}
              </Tab>
              <Tab 
                fontWeight="600"
                _selected={{ 
                  color: 'brand.600',
                  borderColor: 'brand.600',
                  borderBottomColor: 'white'
                }}
              >
                💿 Albums {albums && `(${albums.length})`}
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel px={0}>
                {isLoadingTracks && <LoadingSpinner message="Searching tracks..." />}

                {tracksError && (
                  <ErrorMessage
                    title="Failed to search tracks"
                    message={
                      tracksError instanceof Error
                        ? tracksError.message
                        : 'An error occurred'
                    }
                  />
                )}

                {!isLoadingTracks && !tracksError && tracks && tracks.length === 0 && (
                  <EmptyState
                    title="No tracks found"
                    description="Try searching with different keywords"
                  />
                )}

                {!isLoadingTracks && !tracksError && tracks && tracks.length > 0 && (
                  <TrackList
                    tracks={tracks}
                    album="Various"
                    albumArtist="Various Artists"
                    showNavigation={false}
                  />
                )}
              </TabPanel>

              <TabPanel px={0}>
                {isLoadingAlbums && <LoadingSpinner message="Searching albums..." />}

                {albumsError && (
                  <ErrorMessage
                    title="Failed to search albums"
                    message={
                      albumsError instanceof Error
                        ? albumsError.message
                        : 'An error occurred'
                    }
                  />
                )}

                {!isLoadingAlbums && !albumsError && albums && albums.length === 0 && (
                  <EmptyState
                    title="No albums found"
                    description="Try searching with different keywords"
                  />
                )}

                {!isLoadingAlbums && !albumsError && albums && albums.length > 0 && (
                  <AlbumGrid albums={albums} />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}

        {searchQuery.length === 0 && (
          <Box 
            bg="white" 
            p={10} 
            borderRadius="xl" 
            textAlign="center"
            boxShadow="sm"
            border="1px"
            borderColor="gray.200"
          >
            <Heading size="lg" mb={4} color="gray.900">
              🎵 Start Exploring
            </Heading>
            <Text color="gray.600" fontSize="md">
              Use the search bar above to find tracks, albums, or artists
            </Text>
            <HStack justify="center" mt={6} spacing={4} flexWrap="wrap">
              <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                Tracks
              </Badge>
              <Badge colorScheme="purple" fontSize="sm" px={3} py={1}>
                Albums
              </Badge>
              <Badge colorScheme="green" fontSize="sm" px={3} py={1}>
                Artists
              </Badge>
            </HStack>
          </Box>
        )}
      </VStack>
    </Layout>
  )
}

export default HomePage
