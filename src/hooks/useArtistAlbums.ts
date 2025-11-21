import { useQuery } from '@tanstack/react-query'
import { getArtistAlbums } from '../api/lastfm'
import { queryKeys } from '../api/queryClient'

export function useArtistAlbums(artistName: string) {
  return useQuery({
    queryKey: queryKeys.albums.byArtist(artistName),
    queryFn: () => getArtistAlbums(artistName),
    enabled: artistName.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

