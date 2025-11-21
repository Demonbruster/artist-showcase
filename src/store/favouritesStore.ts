import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FavouriteTrack } from '../types/domain'

interface FavouritesState {
  favourites: FavouriteTrack[]
  addFavourite: (track: FavouriteTrack) => void
  removeFavourite: (trackName: string, artist: string) => void
  isFavourite: (trackName: string, artist: string) => boolean
  clearFavourites: () => void
}

export const useFavouritesStore = create<FavouritesState>()(
  persist(
    (set, get) => ({
      favourites: [],

      addFavourite: track => {
        const { favourites } = get()
        // Check if already exists
        const exists = favourites.some(
          fav => fav.name === track.name && fav.artist === track.artist
        )
        
        if (!exists) {
          set({
            favourites: [...favourites, { ...track, addedAt: Date.now() }],
          })
        }
      },

      removeFavourite: (trackName, artist) => {
        set({
          favourites: get().favourites.filter(
            fav => !(fav.name === trackName && fav.artist === artist)
          ),
        })
      },

      isFavourite: (trackName, artist) => {
        return get().favourites.some(
          fav => fav.name === trackName && fav.artist === artist
        )
      },

      clearFavourites: () => {
        set({ favourites: [] })
      },
    }),
    {
      name: 'artist-showcase-favourites',
    }
  )
)

