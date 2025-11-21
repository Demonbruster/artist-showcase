import axiosInstance from './axios'
import type {
  ArtistSearchResponse,
  ArtistTopAlbumsResponse,
  AlbumInfoResponse,
  TrackSearchResponse,
  AlbumSearchResponse,
  LastfmImage,
} from '../types/lastfm'
import type { Album, Track, AlbumWithTracks } from '../types/domain'

// Helper function to extract image URL
const extractImageUrl = (images: LastfmImage[] | undefined): string => {
  if (!images || images.length === 0) {
    return '/placeholder-album.png'
  }
  
  // Try to get large or extralarge image first
  const largeImage = images.find(img => img.size === 'extralarge' || img.size === 'large')
  if (largeImage && largeImage['#text']) {
    return largeImage['#text']
  }
  
  // Fallback to any available image
  const anyImage = images.find(img => img['#text'])
  return anyImage ? anyImage['#text'] : '/placeholder-album.png'
}

// Helper to parse duration from string to seconds
const parseDuration = (duration: string | undefined): number => {
  if (!duration) return 0
  const parsed = parseInt(duration, 10)
  return isNaN(parsed) ? 0 : parsed
}

// Search for artists by name
export const searchArtist = async (query: string) => {
  try {
    const response = await axiosInstance.get<ArtistSearchResponse>('', {
      params: {
        method: 'artist.search',
        artist: query,
        limit: 10,
      },
    })
    
    return response.data.results.artistmatches.artist
  } catch (error) {
    console.error('Error searching artists:', error)
    throw error
  }
}

// Get top albums for an artist
export const getArtistAlbums = async (artistName: string): Promise<Album[]> => {
  try {
    const response = await axiosInstance.get<ArtistTopAlbumsResponse>('', {
      params: {
        method: 'artist.getTopAlbums',
        artist: artistName,
        limit: 50,
      },
    })
    
    const albums = response.data.topalbums.album
    
    // Transform to domain Album type
    return albums.map(album => ({
      name: album.name,
      artist: typeof album.artist === 'string' ? album.artist : album.artist.name,
      coverImage: extractImageUrl(album.image),
      playcount: album.playcount ? parseInt(album.playcount, 10) : undefined,
      mbid: album.mbid,
      url: album.url,
      // Note: Last.fm doesn't always provide year in top albums, would need album.getInfo
    }))
  } catch (error) {
    console.error('Error fetching artist albums:', error)
    throw error
  }
}

// Get album details including tracks
export const getAlbumInfo = async (
  artist: string,
  album: string
): Promise<AlbumWithTracks> => {
  try {
    const response = await axiosInstance.get<AlbumInfoResponse>('', {
      params: {
        method: 'album.getInfo',
        artist: artist,
        album: album,
      },
    })
    
    const albumData = response.data.album
    
    console.log('Raw album data from API:', albumData)
    console.log('Tracks structure:', albumData.tracks)
    
    // Transform tracks - handle different response structures
    let tracks: Track[] = []
    
    if (albumData.tracks && albumData.tracks.track) {
      // If track is an array
      const trackArray = Array.isArray(albumData.tracks.track) 
        ? albumData.tracks.track 
        : [albumData.tracks.track]
      
      tracks = trackArray.map(track => ({
        name: track.name,
        artist: typeof track.artist === 'string' ? track.artist : track.artist.name,
        duration: parseDuration(track.duration),
        url: track.url,
        playcount: track.playcount ? parseInt(track.playcount, 10) : undefined,
        mbid: track.mbid,
      }))
    }
    
    console.log('Transformed tracks:', tracks)
    
    return {
      name: albumData.name,
      artist: albumData.artist,
      coverImage: extractImageUrl(albumData.image),
      mbid: albumData.mbid,
      url: albumData.url,
      listeners: parseInt(albumData.listeners, 10),
      totalPlaycount: parseInt(albumData.playcount, 10),
      tracks,
    }
  } catch (error) {
    console.error('Error fetching album info:', error)
    throw error
  }
}

// Search for tracks
export const searchTracks = async (query: string): Promise<Track[]> => {
  try {
    const response = await axiosInstance.get<TrackSearchResponse>('', {
      params: {
        method: 'track.search',
        track: query,
        limit: 30,
      },
    })
    
    const tracks = response.data.results.trackmatches.track
    
    return tracks.map(track => ({
      name: track.name,
      artist: typeof track.artist === 'string' ? track.artist : track.artist.name,
      duration: parseDuration(track.duration),
      url: track.url,
      playcount: track.listeners ? parseInt(track.listeners, 10) : undefined,
      mbid: track.mbid,
    }))
  } catch (error) {
    console.error('Error searching tracks:', error)
    throw error
  }
}

// Search for albums
export const searchAlbums = async (query: string): Promise<Album[]> => {
  try {
    const response = await axiosInstance.get<AlbumSearchResponse>('', {
      params: {
        method: 'album.search',
        album: query,
        limit: 30,
      },
    })
    
    const albums = response.data.results.albummatches.album
    
    return albums.map(album => ({
      name: album.name,
      artist: typeof album.artist === 'string' ? album.artist : album.artist.name,
      coverImage: extractImageUrl(album.image),
      mbid: album.mbid,
      url: album.url,
    }))
  } catch (error) {
    console.error('Error searching albums:', error)
    throw error
  }
}

