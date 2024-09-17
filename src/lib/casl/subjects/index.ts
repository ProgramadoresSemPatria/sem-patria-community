import { z } from 'zod'
import { categorySchema } from '../entities/category'
import { classroomSchema } from '../entities/classroom'
import { courseSchema } from '../entities/course'
import { eventSchema } from '../entities/event'
import { mentorshipSchema } from '../entities/mentorship'
import { postSchema } from '../entities/post'
import { userSchema } from '../entities/user'

export const userSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete')
  ]),
  z.union([z.literal('User'), userSchema])
])

export const courseSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('approve')
  ]),
  z.union([z.literal('Course'), courseSchema])
])

export const classroomSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete')
  ]),
  z.union([z.literal('Classroom'), classroomSchema])
])

export const categorySubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete')
  ]),
  z.union([z.literal('Category'), categorySchema])
])

export const eventSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete')
  ]),
  z.union([z.literal('Event'), eventSchema])
])

export const postSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('pin')
  ]),
  z.union([z.literal('Post'), postSchema])
])

export const cmsSubject = z.tuple([z.literal('get'), z.literal('CMS')])

export const mentorshipSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('manageAttachments')
  ]),
  z.union([z.literal('Mentorship'), mentorshipSchema])
])
