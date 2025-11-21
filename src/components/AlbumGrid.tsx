import { SimpleGrid, Box, Text } from '@chakra-ui/react'
import AlbumCard from './AlbumCard'
import type { Album } from '../types/domain'

interface AlbumGridProps {
  albums: Album[]
  emptyMessage?: string
}

const AlbumGrid = ({ albums, emptyMessage = 'No albums found' }: AlbumGridProps) => {
  if (albums.length === 0) {
    return (
      <Box textAlign="center" py={12}>
        <Text color="gray.500" fontSize="lg">
          {emptyMessage}
        </Text>
      </Box>
    )
  }

  return (
    <SimpleGrid
      columns={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
      spacing={{ base: 4, md: 6 }}
    >
      {albums.map(album => (
        <AlbumCard
          key={`${album.artist}-${album.name}-${album.mbid}`}
          album={album}
        />
      ))}
    </SimpleGrid>
  )
}

export default AlbumGrid

