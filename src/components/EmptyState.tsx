import { VStack, Heading, Text, Button } from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => {
  return (
    <VStack spacing={4} py={12} px={4} textAlign="center">
      <InfoIcon boxSize={12} color="gray.400" />
      
      <Heading size="md" color="gray.700">
        {title}
      </Heading>
      
      <Text color="gray.600" maxW="md">
        {description}
      </Text>
      
      {actionLabel && onAction && (
        <Button colorScheme="brand" onClick={onAction} mt={2}>
          {actionLabel}
        </Button>
      )}
    </VStack>
  )
}

export default EmptyState

