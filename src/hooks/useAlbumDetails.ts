import { useQuery } from '@tanstack/react-query'
import { getAlbumInfo } from '../api/lastfm'
import { queryKeys } from '../api/queryClient'

export function useAlbumDetails(artist: string, album: string) {
  return useQuery({
    queryKey: queryKeys.albums.detail(artist, album),
    queryFn: () => getAlbumInfo(artist, album),
    enabled: artist.length > 0 && album.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes - album details don't change often
  })
}

