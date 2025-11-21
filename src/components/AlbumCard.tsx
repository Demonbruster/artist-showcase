import { memo, useState } from 'react'
import { Box, Image, Text, VStack, HStack, Badge, Icon } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FiPlay } from 'react-icons/fi'
import type { Album } from '../types/domain'
import { formatPlayCount } from '../utils/formatters'

interface AlbumCardProps {
  album: Album
}

const AlbumCard = memo(({ album }: AlbumCardProps) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    navigate(`/album/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.name)}`)
  }

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="md"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      _hover={{
        transform: 'translateY(-8px) scale(1.02)',
        boxShadow: '2xl',
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      position="relative"
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
          transition="transform 0.4s ease"
          transform={isHovered ? 'scale(1.1)' : 'scale(1)'}
        />
        
        {/* Gradient overlay on hover */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="linear(to-t, blackAlpha.700, transparent)"
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.3s ease"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            as={FiPlay}
            boxSize={12}
            color="white"
            transform={isHovered ? 'scale(1)' : 'scale(0.5)'}
            opacity={isHovered ? 1 : 0}
            transition="all 0.3s ease"
          />
        </Box>
      </Box>

      <VStack align="stretch" p={4} spacing={2}>
        <Text
          fontWeight="700"
          fontSize="md"
          noOfLines={1}
          title={album.name}
          color="gray.800"
        >
          {album.name}
        </Text>

        <Text fontSize="sm" color="gray.600" noOfLines={1} fontWeight="500">
          {album.artist}
        </Text>

        <HStack justify="space-between" pt={1}>
          {album.year && (
            <Badge 
              colorScheme="brand" 
              variant="subtle" 
              fontSize="xs"
              borderRadius="full"
              px={3}
              py={1}
            >
              {album.year}
            </Badge>
          )}
          
          {album.playcount !== undefined && (
            <Text fontSize="xs" color="gray.500" fontWeight="600">
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

