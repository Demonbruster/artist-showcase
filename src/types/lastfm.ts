// Last.fm API Response Types

export interface LastfmImage {
  '#text': string
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega' | ''
}

export interface LastfmArtist {
  name: string
  mbid: string
  url: string
  image?: LastfmImage[]
  streamable?: string
}

export interface LastfmAlbum {
  name: string
  artist: string | LastfmArtist
  mbid: string
  url: string
  image: LastfmImage[]
  playcount?: string
  '@attr'?: {
    rank?: string
  }
}

export interface LastfmTrack {
  name: string
  duration: string
  url: string
  streamable: {
    '#text': string
    fulltrack: string
  }
  artist: LastfmArtist | string
  '@attr'?: {
    rank: string
  }
  playcount?: string
  listeners?: string
  mbid?: string
  image?: LastfmImage[]
  album?: {
    artist: string
    title: string
    mbid: string
    url: string
    image: LastfmImage[]
    '@attr'?: {
      position: string
    }
  }
}

export interface LastfmAlbumInfo {
  name: string
  artist: string
  mbid: string
  url: string
  image: LastfmImage[]
  listeners: string
  playcount: string
  tracks: {
    track: LastfmTrack[]
  }
  tags?: {
    tag: Array<{
      name: string
      url: string
    }>
  }
  wiki?: {
    published: string
    summary: string
    content: string
  }
}

// API Response Wrappers
export interface ArtistSearchResponse {
  results: {
    artistmatches: {
      artist: LastfmArtist[]
    }
  }
}

export interface ArtistTopAlbumsResponse {
  topalbums: {
    album: LastfmAlbum[]
    '@attr': {
      artist: string
      page: string
      perPage: string
      totalPages: string
      total: string
    }
  }
}

export interface AlbumInfoResponse {
  album: LastfmAlbumInfo
}

export interface TrackSearchResponse {
  results: {
    trackmatches: {
      track: LastfmTrack[]
    }
    '@attr': {
      for: string
    }
  }
}

export interface AlbumSearchResponse {
  results: {
    albummatches: {
      album: LastfmAlbum[]
    }
    '@attr': {
      for: string
    }
  }
}

