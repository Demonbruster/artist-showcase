import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Box, Spinner } from '@chakra-ui/react';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const ArtistPage = lazy(() => import('./pages/ArtistPage'));
const AlbumDetailPage = lazy(() => import('./pages/AlbumDetailPage'));
const FavouritesPage = lazy(() => import('./pages/FavouritesPage'));
const BestPlayedPage = lazy(() => import('./pages/BestPlayedPage'));

// Loading fallback component
const PageLoader = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
  >
    <Spinner size="xl" color="brand.500" />
  </Box>
);

// Wrapper for lazy-loaded components
const LazyPage = ({ Component }: { Component: React.ComponentType }) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyPage Component={HomePage} />,
  },
  {
    path: '/artist/:artistName',
    element: <LazyPage Component={ArtistPage} />,
  },
  {
    path: '/album/:artist/:albumName',
    element: <LazyPage Component={AlbumDetailPage} />,
  },
  {
    path: '/favourites',
    element: <LazyPage Component={FavouritesPage} />,
  },
  {
    path: '/best-played',
    element: <LazyPage Component={BestPlayedPage} />,
  },
]);

