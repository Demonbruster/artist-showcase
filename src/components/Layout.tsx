import { ReactNode } from 'react'
import { Box, Container, Flex, Heading, Link as ChakraLink, HStack } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Box as="header" bg="white" borderBottom="1px" borderColor="gray.200" py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading
              as={RouterLink}
              to="/"
              size="lg"
              color="brand.600"
              _hover={{ color: 'brand.700' }}
            >
              Artist Showcase
            </Heading>
            
            <HStack spacing={6}>
              <ChakraLink
                as={RouterLink}
                to="/"
                fontSize="md"
                fontWeight="medium"
                color="gray.600"
                _hover={{ color: 'brand.600' }}
              >
                Search
              </ChakraLink>
              
              <ChakraLink
                as={RouterLink}
                to="/favourites"
                fontSize="md"
                fontWeight="medium"
                color="gray.600"
                _hover={{ color: 'brand.600' }}
              >
                Favourites
              </ChakraLink>
              
              <ChakraLink
                as={RouterLink}
                to="/best-played"
                fontSize="md"
                fontWeight="medium"
                color="gray.600"
                _hover={{ color: 'brand.600' }}
              >
                Best Played
              </ChakraLink>
            </HStack>
          </Flex>
        </Container>
      </Box>
      
      <Box as="main" py={8}>
        <Container maxW="container.xl">{children}</Container>
      </Box>
      
      <Box
        as="footer"
        bg="white"
        borderTop="1px"
        borderColor="gray.200"
        py={6}
        mt="auto"
      >
        <Container maxW="container.xl">
          <Flex justify="center" align="center" color="gray.600" fontSize="sm">
            Powered by Last.fm API
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout

