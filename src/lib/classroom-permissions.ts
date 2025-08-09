import { currentUser } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb'
import { preBasePermissions, prePspPermissions } from '@/lib/constants'
import type { Roles } from '@prisma/client'

export interface ClassroomPermissionResult {
  hasAccess: boolean
  userRoles: Roles[]
  reason?: string
}

/**
 * Checks if the current user has permission to access a specific classroom
 */
export const checkClassroomPermission = async (
  classroomId: string
): Promise<ClassroomPermissionResult> => {
  try {
    const user = await currentUser()

    if (!user?.id) {
      return {
        hasAccess: false,
        userRoles: [],
        reason: 'User not authenticated'
      }
    }

    // Get user data
    const userProps = await prismadb.user.findUnique({
      where: { id: user.id },
      select: { role: true }
    })

    if (!userProps) {
      return {
        hasAccess: false,
        userRoles: [],
        reason: 'User not found in database'
      }
    }

    // Get classroom with permissions
    const classroom = await prismadb.classroom.findUnique({
      where: { id: classroomId },
      select: {
        permissions: true,
        title: true
      }
    })

    if (!classroom) {
      return {
        hasAccess: false,
        userRoles: userProps.role,
        reason: 'Classroom not found'
      }
    }

    // Check if user has any of the required roles
    const hasRequiredRole = classroom.permissions.some(permission =>
      userProps.role.includes(permission)
    )

    if (!hasRequiredRole) {
      return {
        hasAccess: false,
        userRoles: userProps.role,
        reason: `User does not have required role. Required: ${classroom.permissions.join(
          ', '
        )}, User has: ${userProps.role.join(', ')}`
      }
    }

    return {
      hasAccess: true,
      userRoles: userProps.role
    }
  } catch (error) {
    console.error('Error checking classroom permission:', error)
    return {
      hasAccess: false,
      userRoles: [],
      reason: 'Internal server error'
    }
  }
}

/**
 * Checks if the current user has permission to access a specific video
 */
export const checkVideoPermission = async (
  videoId: string
): Promise<ClassroomPermissionResult> => {
  try {
    // First get the video and its associated classroom
    const video = await prismadb.video.findUnique({
      where: { id: videoId },
      include: {
        classroomModule: {
          include: {
            classroom: {
              select: {
                id: true,
                title: true,
                permissions: true
              }
            }
          }
        }
      }
    })

    if (!video?.classroomModule?.classroom) {
      return {
        hasAccess: false,
        userRoles: [],
        reason: 'Video or associated classroom not found'
      }
    }

    // Check classroom permission
    const classroomPermission = await checkClassroomPermission(
      video.classroomModule.classroom.id
    )

    if (!classroomPermission.hasAccess) {
      return classroomPermission
    }

    // Additional module-level permission checks for Pre-roles
    const user = await currentUser()
    const userProps = await prismadb.user.findUnique({
      where: { id: user?.id },
      select: { role: true }
    })

    if (!userProps) {
      return {
        hasAccess: false,
        userRoles: [],
        reason: 'User not found'
      }
    }

    const isPrePsp = userProps.role.includes('PrePsp')
    const isPreBase = userProps.role.includes('PreBase')
    const classroomTitle = video.classroomModule.classroom.title

    // Check PrePsp specific permissions
    if (isPrePsp) {
      const prePspRestrictions = prePspPermissions[classroomTitle]
      if (prePspRestrictions) {
        const isAllowed = prePspRestrictions.includes(video.classroomModule.id)
        if (!isAllowed) {
          return {
            hasAccess: false,
            userRoles: userProps.role,
            reason: 'PrePsp user does not have access to this specific module'
          }
        }
      }
    }

    // Check PreBase specific permissions
    if (isPreBase) {
      const preBaseRestrictions = preBasePermissions[classroomTitle]
      if (preBaseRestrictions) {
        const isAllowed = preBaseRestrictions.includes(video.classroomModule.id)
        if (!isAllowed) {
          return {
            hasAccess: false,
            userRoles: userProps.role,
            reason: 'PreBase user does not have access to this specific module'
          }
        }
      }
    }

    return {
      hasAccess: true,
      userRoles: userProps.role
    }
  } catch (error) {
    console.error('Error checking video permission:', error)
    return {
      hasAccess: false,
      userRoles: [],
      reason: 'Internal server error'
    }
  }
}
