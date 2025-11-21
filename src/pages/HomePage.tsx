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
        <Box textAlign="center">
          <Heading size="xl" mb={2}>
            Discover Music
          </Heading>
          <Text color="gray.600">
            Search for songs and albums, or explore artists
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
          <Tabs colorScheme="brand" variant="enclosed">
            <TabList>
              <Tab>
                Tracks {tracks && `(${tracks.length})`}
              </Tab>
              <Tab>
                Albums {albums && `(${albums.length})`}
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
          <Box bg="white" p={8} borderRadius="lg" textAlign="center">
            <Heading size="md" mb={4}>
              Explore by Artist
            </Heading>
            <Text color="gray.600" mb={6}>
              Search for your favorite artist to see their albums
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
