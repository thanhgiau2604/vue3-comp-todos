import { ref } from 'vue'
import { defineStore } from 'pinia'
import { generateId } from '@/utils'

interface TodoItem {
  id: string
  content: string
}

export const useTodoStore = defineStore('todo', () => {
  const todoList = ref<TodoItem[]>([])
  function updateTodo(value: string, index: number) {
    todoList.value[index].content = value
  }

  function addTodo(value: string) {
    todoList.value.push({ content: value, id: generateId() })
  }

  function deleteTodo(index: number) {
    todoList.value.splice(index, 1)
  }

  return { todoList, updateTodo, addTodo, deleteTodo }
})
