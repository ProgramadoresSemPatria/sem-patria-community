import { create } from 'zustand'
import { type TodoList, type TodoStore } from '@/hooks/checklist/type'
import mockData from '@/hooks/checklist/mock/data.json'

const initialData: TodoList = mockData

export const useTodos = create<TodoStore>(set => ({
  todos: initialData,
  setTodos: todos => {
    set({ todos })
  }
}))
