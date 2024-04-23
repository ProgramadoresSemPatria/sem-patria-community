'use client'
import { Button } from '@/components/ui/button'
import { useCategory } from '@/hooks/category/use-category'
import { usePostContent } from '@/hooks/post/use-post-filter-options'
import Link from 'next/link'
import React from 'react'

const ForumFilters = () => {
  const { categories } = useCategory()
  const { pathname, searchParams } = usePostContent()

  const categoryOptions =
    categories && categories.length > 0
      ? [
          {
            id: 'all',
            name: 'All'
          },
          ...categories
        ]
      : []
  return (
    <div>
      <div className="flex gap-x-2 py-2 overflow-auto">
        {categoryOptions?.map(category => {
          return (
            <Link
              key={category.id}
              href={`${pathname}?category=${category.name}`}
            >
              <Button
                className="p-2"
                variant={
                  searchParams.get('category') === category.name
                    ? 'secondary'
                    : 'ghost'
                }
              >
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </Button>
            </Link>
          )
        })}
      </div>
      {/*
      <div>
        <div>
          {isLoading && <SkeletonCourseCards />}
          <div>
            {!isLoading &&
              postList &&
              postList.length > 0 &&
              postList.map(post => {
                return (
                  <Link
                    href={post.id}
                    key={post.id}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Post
                      key={post.id}
                      post={post}
                      commentAmt={post.comments.length}
                      votesAmt={votesAmt}
                      subredditName={category.name}
                    />
                  </Link>
                )
              })}
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ForumFilters
