import { ReactNode } from 'react'
import { 
  Box, 
  Container, 
  Flex, 
  Heading, 
  Link as ChakraLink, 
  HStack,
  Icon,
  Text,
  useColorModeValue 
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Search2Icon, StarIcon } from '@chakra-ui/icons'
import { FiBarChart2 } from 'react-icons/fi'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const headerBg = useColorModeValue('white', 'gray.800')
  const headerShadow = useColorModeValue('sm', 'dark-lg')

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const NavLink = ({ to, icon, children }: { to: string; icon: any; children: ReactNode }) => {
    const active = isActive(to)
    return (
      <ChakraLink
        as={RouterLink}
        to={to}
        display="flex"
        alignItems="center"
        gap={2}
        px={4}
        py={2}
        borderRadius="xl"
        fontSize="md"
        fontWeight="600"
        color={active ? 'brand.600' : 'gray.600'}
        bg={active ? 'brand.50' : 'transparent'}
        transition="all 0.3s ease"
        _hover={{
          color: 'brand.600',
          bg: 'brand.50',
          transform: 'translateY(-2px)',
        }}
      >
        <Icon as={icon} />
        {children}
      </ChakraLink>
    )
  }

  return (
    <Box minH="100vh" position="relative">
      {/* Header with glassmorphism effect */}
      <Box
        as="header"
        bg={headerBg}
        backdropFilter="blur(10px)"
        borderBottom="1px"
        borderColor="gray.100"
        boxShadow={headerShadow}
        position="sticky"
        top={0}
        zIndex={100}
        py={4}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading
              as={RouterLink}
              to="/"
              size="lg"
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
              fontWeight="800"
              letterSpacing="tight"
              transition="all 0.3s ease"
              _hover={{ 
                transform: 'scale(1.05)',
              }}
            >
              🎵 Artist Showcase
            </Heading>
            
            <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
              <NavLink to="/" icon={Search2Icon}>
                Search
              </NavLink>
              <NavLink to="/favourites" icon={StarIcon}>
                Favourites
              </NavLink>
              <NavLink to="/best-played" icon={FiBarChart2}>
                Charts
              </NavLink>
            </HStack>

            {/* Mobile menu - simple icons */}
            <HStack spacing={3} display={{ base: 'flex', md: 'none' }}>
              <ChakraLink
                as={RouterLink}
                to="/"
                p={2}
                borderRadius="lg"
                color={isActive('/') ? 'brand.600' : 'gray.600'}
                bg={isActive('/') ? 'brand.50' : 'transparent'}
              >
                <Icon as={Search2Icon} boxSize={5} />
              </ChakraLink>
              <ChakraLink
                as={RouterLink}
                to="/favourites"
                p={2}
                borderRadius="lg"
                color={isActive('/favourites') ? 'brand.600' : 'gray.600'}
                bg={isActive('/favourites') ? 'brand.50' : 'transparent'}
              >
                <Icon as={StarIcon} boxSize={5} />
              </ChakraLink>
              <ChakraLink
                as={RouterLink}
                to="/best-played"
                p={2}
                borderRadius="lg"
                color={isActive('/best-played') ? 'brand.600' : 'gray.600'}
                bg={isActive('/best-played') ? 'brand.50' : 'transparent'}
              >
                <Icon as={FiBarChart2} boxSize={5} />
              </ChakraLink>
            </HStack>
          </Flex>
        </Container>
      </Box>
      
      <Box as="main" py={8} minH="calc(100vh - 200px)">
        <Container maxW="container.xl">{children}</Container>
      </Box>
      
      <Box
        as="footer"
        bg="white"
        borderTop="1px"
        borderColor="gray.100"
        py={8}
        mt="auto"
      >
        <Container maxW="container.xl">
          <Flex justify="center" align="center" direction="column" gap={2}>
            <Text fontSize="sm" color="gray.600" fontWeight="500">
              Powered by Last.fm API
            </Text>
            <Text fontSize="xs" color="gray.400">
              Made with ❤️ for music lovers
            </Text>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Layout

