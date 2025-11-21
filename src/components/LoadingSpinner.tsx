import { Center, Spinner, Text, VStack, Box } from '@chakra-ui/react'

interface LoadingSpinnerProps {
  message?: string
}

const LoadingSpinner = ({ message = 'Loading...' }: LoadingSpinnerProps) => {
  return (
    <Center py={16}>
      <VStack spacing={6}>
        <Box
          position="relative"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="absolute"
            w="80px"
            h="80px"
            borderRadius="full"
            bg="brand.100"
            sx={{
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 },
              },
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
          <Spinner
            thickness="4px"
            speed="0.8s"
            emptyColor="gray.200"
            color="brand.500"
            size="xl"
            position="relative"
            zIndex={1}
          />
        </Box>
        <Text 
          color="gray.600" 
          fontSize="md" 
          fontWeight="600"
          sx={{
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.5 },
            },
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}
        >
          {message}
        </Text>
      </VStack>
    </Center>
  )
}

export default LoadingSpinner

