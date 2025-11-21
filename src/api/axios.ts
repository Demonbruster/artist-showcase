import axios from 'axios'

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const BASE_URL = import.meta.env.VITE_LASTFM_API_URL || 'https://ws.audioscrobbler.com/2.0/'

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    api_key: API_KEY,
    format: 'json',
  },
})

// Request interceptor for logging and adding headers
axiosInstance.interceptors.request.use(
  config => {
    // You can add custom headers here if needed
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status
      const message = error.response.data?.message || 'An error occurred'
      
      if (status === 429) {
        console.error('Rate limit exceeded. Please try again later.')
      } else if (status >= 500) {
        console.error('Server error. Please try again later.')
      }
      
      return Promise.reject(new Error(message))
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject(new Error('Network error. Please check your connection.'))
    } else {
      // Something else happened
      return Promise.reject(error)
    }
  }
)

export default axiosInstance
