import axios from 'axios'

export const api = axios.create({})

export const vimeoApi = axios.create({
  baseURL: 'https://api.vimeo.com',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`
  }
})
