import { useState } from 'react'
import {
  VStack,
  Heading,
  Box,
  HStack,
  Image,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import { useAlbumSearch, useAlbumDetails } from '../hooks'
import { formatPlayCount } from '../utils/formatters'

const BestPlayedPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAlbum, setSelectedAlbum] = useState<{
    artist: string
    name: string
  } | null>(null)
  const toast = useToast()

  const {
    data: searchResults,
    isLoading: isSearching,
  } = useAlbumSearch(searchQuery)

  const {
    data: albumDetails,
    isLoading: isLoadingDetails,
    error: albumError,
  } = useAlbumDetails(
    selectedAlbum?.artist || '',
    selectedAlbum?.name || ''
  )

  const handleAlbumSelect = (artist: string, albumName: string) => {
    setSelectedAlbum({ artist, name: albumName })
    setSearchQuery('')
    toast({
      title: 'Album selected',
      description: `Loading data for "${albumName}"`,
      status: 'info',
      duration: 2000,
      isClosable: true,
    })
  }

  // Prepare chart data
  const chartData = albumDetails?.tracks
    ?.filter(track => track.playcount && track.playcount > 0)
    .sort((a, b) => (b.playcount || 0) - (a.playcount || 0))
    .slice(0, 10) // Top 10 tracks
    .map(track => ({
      name: track.name.length > 20 ? track.name.substring(0, 20) + '...' : track.name,
      fullName: track.name,
      plays: track.playcount || 0,
    }))

  const colors = [
    '#2196f3',
    '#1e88e5',
    '#1976d2',
    '#1565c0',
    '#0d47a1',
    '#42a5f5',
    '#64b5f6',
    '#90caf9',
    '#bbdefb',
    '#e3f2fd',
  ]

  return (
    <Layout>
      <VStack spacing={6} align="stretch">
        <Box 
          bg="white" 
          p={8} 
          borderRadius="xl" 
          boxShadow="sm"
          textAlign="center"
          borderBottom="3px"
          borderColor="brand.500"
        >
          <Heading 
            size="2xl" 
            mb={3}
            color="gray.900"
            fontWeight="700"
          >
            📊 Most Played Tracks
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Search for an album to visualize its most played tracks
          </Text>
        </Box>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for an album..."
        />

        {isSearching && searchQuery.length >= 3 && (
          <LoadingSpinner message="Searching albums..." />
        )}

        {searchResults && searchResults.length > 0 && searchQuery.length >= 3 && (
          <Box bg="white" p={6} borderRadius="xl" maxH="500px" overflowY="auto" boxShadow="sm" border="1px" borderColor="gray.200">
            <Heading size="md" mb={4} color="gray.900" fontWeight="700">
              🔍 Search Results
            </Heading>
            <VStack spacing={2} align="stretch">
              {searchResults.map((album, index) => (
                <HStack
                  key={`${album.artist}-${album.name}-${index}`}
                  p={3}
                  borderRadius="md"
                  _hover={{ bg: 'gray.50' }}
                  cursor="pointer"
                  onClick={() => handleAlbumSelect(album.artist, album.name)}
                >
                  <Image
                    src={album.coverImage}
                    alt={album.name}
                    boxSize="50px"
                    borderRadius="md"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/50x50?text=No+Image"
                  />
                  <Box flex={1} minW={0}>
                    <Text fontWeight="semibold" noOfLines={1}>
                      {album.name}
                    </Text>
                    <Text fontSize="sm" color="gray.600" noOfLines={1}>
                      {album.artist}
                    </Text>
                  </Box>
                  <Button size="sm" colorScheme="brand">
                    View
                  </Button>
                </HStack>
              ))}
            </VStack>
          </Box>
        )}

        {selectedAlbum && (
          <>
            {isLoadingDetails && <LoadingSpinner message="Loading album data..." />}

            {albumError && (
              <ErrorMessage
                title="Failed to load album"
                message={
                  albumError instanceof Error
                    ? albumError.message
                    : 'Could not fetch album details'
                }
              />
            )}

            {!isLoadingDetails && !albumError && albumDetails && (
              <VStack spacing={6} align="stretch">
                <HStack
                  bg="white"
                  p={8}
                  borderRadius="xl"
                  spacing={6}
                  flexWrap="wrap"
                  boxShadow="sm"
                  border="1px"
                  borderColor="gray.200"
                >
                  <Image
                    src={albumDetails.coverImage}
                    alt={albumDetails.name}
                    boxSize={{ base: '120px', md: '150px' }}
                    borderRadius="lg"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/150x150?text=No+Image"
                  />
                  <VStack align="start" flex={1} spacing={2}>
                    <Heading size="lg">{albumDetails.name}</Heading>
                    <Text color="gray.600" fontSize="lg">
                      {albumDetails.artist}
                    </Text>
                    {albumDetails.totalPlaycount !== undefined && (
                      <Text color="gray.500" fontSize="sm">
                        Total plays: {formatPlayCount(albumDetails.totalPlaycount)}
                      </Text>
                    )}
                  </VStack>
                </HStack>

                {chartData && chartData.length > 0 ? (
                  <Box bg="white" p={8} borderRadius="xl" boxShadow="sm" border="1px" borderColor="gray.200">
                    <Heading size="lg" mb={6} color="gray.900" fontWeight="700">
                      🎵 Top 10 Most Played Tracks
                    </Heading>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} />
                        <Tooltip
                          content={({ payload }) => {
                            if (payload && payload.length > 0 && payload[0]) {
                              const data = payload[0].payload
                              return (
                                <Box bg="white" p={3} borderRadius="md" boxShadow="md">
                                  <Text fontWeight="semibold">{data.fullName}</Text>
                                  <Text color="gray.600">
                                    {formatPlayCount(data.plays)} plays
                                  </Text>
                                </Box>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="plays" radius={[0, 8, 8, 0]}>
                          {chartData.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <EmptyState
                    title="No play count data"
                    description="This album doesn't have play count information available"
                  />
                )}
              </VStack>
            )}
          </>
        )}

        {!selectedAlbum && searchQuery.length === 0 && (
          <EmptyState
            title="Search for an Album"
            description="Enter an album name in the search bar above to view its most played tracks"
          />
        )}
      </VStack>
    </Layout>
  )
}

export default BestPlayedPage
