import { memo } from 'react'
import { Box, Image, Text, VStack, HStack, Badge } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import type { Album } from '../types/domain'
import { formatPlayCount } from '../utils/formatters'

interface AlbumCardProps {
  album: Album
}

const AlbumCard = memo(({ album }: AlbumCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/album/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.name)}`)
  }

  return (
    <Box
      bg="white"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
      transition="all 0.2s"
      cursor="pointer"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'lg',
      }}
      onClick={handleClick}
    >
      <Box position="relative" paddingBottom="100%" bg="gray.100">
        <Image
          src={album.coverImage}
          alt={album.name}
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          objectFit="cover"
          loading="lazy"
          fallbackSrc="https://via.placeholder.com/300x300?text=No+Image"
        />
      </Box>

      <VStack align="stretch" p={4} spacing={2}>
        <Text
          fontWeight="semibold"
          fontSize="md"
          noOfLines={1}
          title={album.name}
        >
          {album.name}
        </Text>

        <Text fontSize="sm" color="gray.600" noOfLines={1}>
          {album.artist}
        </Text>

        <HStack justify="space-between">
          {album.year && (
            <Badge colorScheme="brand" variant="subtle" fontSize="xs">
              {album.year}
            </Badge>
          )}
          
          {album.playcount !== undefined && (
            <Text fontSize="xs" color="gray.500">
              {formatPlayCount(album.playcount)} plays
            </Text>
          )}
        </HStack>
      </VStack>
    </Box>
  )
})

AlbumCard.displayName = 'AlbumCard'

export default AlbumCard

