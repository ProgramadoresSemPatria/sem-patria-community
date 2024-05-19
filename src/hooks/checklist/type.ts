export interface TodoItem {
  id: string
  title: string
  completed: boolean
  updatedAt?: string
}

export interface TodoList {
  weekly: TodoItem[]
  daily: TodoItem[]
  monthly: TodoItem[]
  uniqueActions: TodoItem[]
}

export interface TodoStore {
  todos: TodoList
  setTodos: (todos: TodoList) => void
}
