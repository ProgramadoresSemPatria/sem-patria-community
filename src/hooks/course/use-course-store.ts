import { type Course } from '@prisma/client'
import { create } from 'zustand'

type State = {
  courseList: Course[]
}

type Actions = {
  setCourseList: (courseList: Course[]) => void
}

export const useCourseStore = create<State & Actions>(set => ({
  courseList: [],
  setCourseList: courseList => {
    set({ courseList })
  }
}))
