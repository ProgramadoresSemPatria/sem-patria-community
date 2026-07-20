import axios from 'axios'
import { IS_READ_ONLY, isBlockedWrite } from '@/lib/read-only'
import { toast } from '@/components/ui/use-toast'

export const api = axios.create({})

// Read-only migration lock (client safety net): reject any write request
// before it leaves the browser so no new information can be pushed. The
// server middleware is the authoritative block; this mirrors its allowlist
// and gives immediate user feedback.
if (IS_READ_ONLY) {
  api.interceptors.request.use(async config => {
    const rawUrl = config.url ?? ''
    const pathname = rawUrl.startsWith('http')
      ? new URL(rawUrl).pathname
      : rawUrl.split('?')[0]

    if (isBlockedWrite(config.method, pathname)) {
      if (typeof window !== 'undefined') {
        toast({
          title: 'Somente leitura',
          description:
            'A plataforma está em modo somente leitura durante a migração.',
          variant: 'destructive'
        })
      }
      return await Promise.reject(new Error('READ_ONLY_MODE'))
    }

    return config
  })
}

export const vimeoApi = axios.create({
  baseURL: 'https://api.vimeo.com',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_ACCESS_TOKEN}`
  }
})
