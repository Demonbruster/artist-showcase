import { useQuery } from '@tanstack/react-query'
import { searchAlbums } from '../api/lastfm'
import { queryKeys } from '../api/queryClient'
import { useDebounce } from './useDebounce'

export function useAlbumSearch(query: string) {
  const debouncedQuery = useDebounce(query, 300)

  return useQuery({
    queryKey: queryKeys.albums.search(debouncedQuery),
    queryFn: () => searchAlbums(debouncedQuery),
    enabled: debouncedQuery.length > 2, // Only search if query is at least 3 characters
    staleTime: 3 * 60 * 1000, // 3 minutes
  })
}

