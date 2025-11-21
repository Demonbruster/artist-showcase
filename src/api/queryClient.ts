import { QueryClient } from '@tanstack/react-query'

// Configure React Query client with caching and retry logic
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

// Query key factory for consistent cache management
export const queryKeys = {
  artists: {
    search: (query: string) => ['artists', 'search', query] as const,
  },
  albums: {
    all: ['albums'] as const,
    byArtist: (artistName: string) => ['albums', 'artist', artistName] as const,
    detail: (artist: string, album: string) => ['albums', 'detail', artist, album] as const,
    search: (query: string) => ['albums', 'search', query] as const,
  },
  tracks: {
    search: (query: string) => ['tracks', 'search', query] as const,
  },
}
