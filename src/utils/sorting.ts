import type { Album, SortOrder } from '../types/domain'

// Sort albums based on sort order
export function sortAlbums(albums: Album[], sortOrder: SortOrder): Album[] {
  const sorted = [...albums]
  
  switch (sortOrder) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    
    case 'year-asc':
      return sorted.sort((a, b) => {
        const yearA = a.year ? parseInt(a.year) : 0
        const yearB = b.year ? parseInt(b.year) : 0
        return yearA - yearB
      })
    
    case 'year-desc':
      return sorted.sort((a, b) => {
        const yearA = a.year ? parseInt(a.year) : 0
        const yearB = b.year ? parseInt(b.year) : 0
        return yearB - yearA
      })
    
    default:
      return sorted
  }
}

