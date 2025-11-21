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

  const handleArtistSearch = (artistName: string) => {
    if (artistName.trim()) {
      navigate(`/artist/${encodeURIComponent(artistName.trim())}`)
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
          borderRadius="3xl"
          boxShadow="xl"
        >
          <Heading 
            size="2xl" 
            mb={3}
            bgGradient="linear(to-r, brand.500, accent.500)"
            bgClip="text"
            fontWeight="800"
          >
            Discover Amazing Music
          </Heading>
          <Text color="gray.600" fontSize="lg" fontWeight="500">
            Search for songs and albums, or explore your favorite artists
          </Text>
        </Box>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for tracks or albums..."
        />

        {searchQuery.length > 0 && searchQuery.length < 3 && (
          <Text color="gray.500" textAlign="center" fontSize="sm">
            Type at least 3 characters to search
          </Text>
        )}

        {searchQuery.length >= 3 && (
          <Tabs colorScheme="brand" variant="soft-rounded" bg="white" p={6} borderRadius="2xl" boxShadow="lg">
            <TabList mb={6}>
              <Tab 
                fontWeight="600" 
                borderRadius="xl"
                _selected={{ 
                  color: 'white', 
                  bg: 'brand.500',
                  boxShadow: 'md'
                }}
              >
                🎵 Tracks {tracks && `(${tracks.length})`}
              </Tab>
              <Tab 
                fontWeight="600"
                borderRadius="xl"
                _selected={{ 
                  color: 'white', 
                  bg: 'brand.500',
                  boxShadow: 'md'
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
            borderRadius="2xl" 
            textAlign="center"
            boxShadow="xl"
            border="2px"
            borderColor="gray.100"
          >
            <Heading size="lg" mb={4} color="gray.800">
              🎸 Explore by Artist
            </Heading>
            <Text color="gray.600" mb={8} fontSize="md">
              Search for your favorite artist to discover their complete discography
            </Text>
            <SearchBar
              value=""
              onChange={handleArtistSearch}
              placeholder="Enter artist name and press Enter..."
            />
          </Box>
        )}
      </VStack>
    </Layout>
  )
}

export default HomePage
