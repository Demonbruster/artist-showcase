import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Box, Spinner, Center } from '@chakra-ui/react'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const ArtistPage = lazy(() => import('./pages/ArtistPage'))
const AlbumDetailPage = lazy(() => import('./pages/AlbumDetailPage'))
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'))
const BestPlayedPage = lazy(() => import('./pages/BestPlayedPage'))

// Loading component for suspense fallback
const LoadingFallback = () => (
  <Center h="100vh" bg="gray.50">
    <Spinner size="xl" color="brand.500" thickness="4px" />
  </Center>
)

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HomePage />
      </Suspense>
    ),
  },
  {
    path: '/artist/:artistName',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ArtistPage />
      </Suspense>
    ),
  },
  {
    path: '/album/:artist/:albumName',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AlbumDetailPage />
      </Suspense>
    ),
  },
  {
    path: '/favourites',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <FavouritesPage />
      </Suspense>
    ),
  },
  {
    path: '/best-played',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <BestPlayedPage />
      </Suspense>
    ),
  },
])

// Router component wrapper
export function AppRouter() {
  return <RouterProvider router={router} />
}
