import axios from 'axios';

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const BASE_URL = import.meta.env.VITE_LASTFM_API_URL;

// Create axios instance with base configuration
export const lastfmApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    api_key: API_KEY,
    format: 'json',
  },
});

// Request interceptor for logging and debugging
lastfmApi.interceptors.request.use(
  config => {
    // You could add request timing or logging here
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
lastfmApi.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      if (status === 429) {
        console.error('Rate limit exceeded. Please try again later.');
      } else if (status >= 500) {
        console.error('Server error. Please try again later.');
      }
      
      return Promise.reject({
        message: data.message || 'An error occurred',
        status,
      });
    } else if (error.request) {
      // Request was made but no response received
      return Promise.reject({
        message: 'Network error. Please check your connection.',
        status: 0,
      });
    }
    
    return Promise.reject(error);
  }
);

