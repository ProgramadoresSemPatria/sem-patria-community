import { usePost } from '@/hooks/post/use-post'
import { type ExtendedPost } from '@/lib/types'
import { useIntersection } from '@mantine/hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type UseForumFeedProps = {
  initialPosts: ExtendedPost[]
}

export const useForumFeed = ({ initialPosts }: UseForumFeedProps) => {
  const { fetchNextPage, data, isFetchingNextPage } = usePost({ initialPosts })
  const lastPostRef = useRef<HTMLElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [allPosts, setAllPosts] = useState(initialPosts)
  const [pinnedPosts, setPinnedPosts] = useState<ExtendedPost[]>()
  const [filteredPosts, setFilteredPosts] =
    useState<ExtendedPost[]>(initialPosts)

  useEffect(() => {
    if (data.pages) {
      const allPosts = data.pages.flatMap(page => page)
      setAllPosts(allPosts)

      const searchTerm = searchParams.get('search')
      if (searchTerm) {
        const filtered = allPosts.filter(
          post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPosts(filtered)
      } else {
        setFilteredPosts(allPosts)
      }
    }
  }, [data.pages, searchParams])

  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      void fetchNextPage()
    }
  }, [entry, fetchNextPage])

  useEffect(() => {
    if (!searchParams.get('category')) {
      router.push(`${pathname}?category=All`)
    }
  }, [pathname, router, searchParams])

  useEffect(() => {
    if (data.pages) {
      setAllPosts(data.pages.flatMap(page => page))
    }
  }, [data.pages])

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setPinnedPosts(
        allPosts?.filter(
          post => post?.isPinned && post?.category?.name === category
        )
      )
    }
  }, [allPosts, searchParams])

  return {
    pinnedPosts,
    ref,
    searchParams,
    allPosts,
    filteredPosts,
    isFetchingNextPage
  }
}
