// Domain Types for Application

export interface Album {
  name: string
  artist: string
  year?: string
  coverImage: string
  playcount?: number
  mbid: string
  url: string
}

export interface Track {
  name: string
  artist: string
  duration: number // in seconds
  url: string
  playcount?: number
  mbid?: string
}

export interface AlbumWithTracks extends Album {
  tracks: Track[]
  listeners?: number
  totalPlaycount?: number
}

export interface FavouriteTrack extends Track {
  album: string
  albumArtist: string
  addedAt: number // timestamp
}

export interface SearchResult {
  albums: Album[]
  tracks: Track[]
}

export type SortOrder = 'year-asc' | 'year-desc' | 'name-asc' | 'name-desc'

export type SearchFilter = 'all' | 'tracks' | 'albums'

// Utility function types
export interface PaginationInfo {
  page: number
  perPage: number
  total: number
  totalPages: number
}

