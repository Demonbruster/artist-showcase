// Format duration from seconds to MM:SS
export function formatDuration(seconds: number): string {
  if (!seconds || seconds === 0) return '0:00'
  
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

// Format play count with K/M suffixes
export function formatPlayCount(count: number | undefined): string {
  if (!count) return '0'
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  
  return count.toString()
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

