import axios from 'axios'

export const useHttp = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL as string,

  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY as string}`
  }
})
