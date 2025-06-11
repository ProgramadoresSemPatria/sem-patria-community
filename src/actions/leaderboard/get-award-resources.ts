'use server'

import prismadb from '@/lib/prismadb'
import { type AwardResource } from '@prisma/client'

export const getAwardResources = async (): Promise<AwardResource[]> => {
  try {
    const awardResources = await prismadb.awardResource.findMany({
      where: {
        disabled: false
      }
    })
    return awardResources
  } catch (error) {
    console.error('[GET_AWARD_RESOURCES_ERROR]', error)
    return []
  }
}
