import { VStack, Heading, Text, Button, Box } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <VStack 
      spacing={6} 
      py={16} 
      px={4} 
      textAlign="center"
      bg="white"
      borderRadius="2xl"
      boxShadow="md"
    >
      <Box
        p={6}
        bg="brand.50"
        borderRadius="full"
        display="inline-flex"
      >
        <InfoIcon boxSize={12} color="brand.500" />
      </Box>
      
      <Heading size="lg" color="gray.800" fontWeight="700">
        {title}
      </Heading>
      
      <Text color="gray.600" maxW="md" fontSize="md" lineHeight="tall">
        {description}
      </Text>
      
      {actionLabel && onAction && (
        <Button 
          colorScheme="brand" 
          onClick={onAction} 
          mt={4}
          size="lg"
          borderRadius="xl"
          boxShadow="md"
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
        >
          {actionLabel}
        </Button>
      )}
    </VStack>
  )
}

export default EmptyState

