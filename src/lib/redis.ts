import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.REDIS_URL as string,
  token: process.env.REDIS_PASSWORD as string
})
