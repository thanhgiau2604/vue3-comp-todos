<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { useTodoStore } from '@/stores/todos.js'
import TodoItem from './TodoItem.vue'

const { todoList, addTodo, updateTodo, deleteTodo } = useTodoStore()
const content = ref('')
const refContent = ref<HTMLInputElement>()
const state = reactive({ showForm: false })

async function toggleShow() {
  state.showForm = !state.showForm
  await nextTick()
  refContent.value?.focus()
}

function handleAddTodo() {
  addTodo(content.value)
  toggleShow()
  content.value = ''
}

function handleEditTodo(newContent: string, index: number) {
  updateTodo(newContent, index)
}

function handleDeleteTodo(index: number) {
  deleteTodo(index)
}
</script>

<template>
  <div class="todo-wrapper">
    <div class="btn-wrapper">
      <button class="btn btn-primary" @click="toggleShow">+ Add new</button>
    </div>
    <form v-if="state.showForm" @submit.prevent="handleAddTodo">
      <div class="add-form">
        <input v-model="content" placeholder="Add content" ref="refContent" />
        <button class="btn btn-success" type="submit">Submit</button>
      </div>
    </form>

    <div class="todo-list">
      <div v-for="(item, index) in todoList" :key="item.id">
        <TodoItem
          :content="item.content"
          :handle-edit-todo="handleEditTodo"
          :handle-delete-todo="handleDeleteTodo"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-wrapper {
  margin-bottom: 20px;
  text-align: right;
}
.todo-wrapper {
  min-height: calc(100vh - 72px);
  padding-top: 20px;
  width: 100%;
  max-width: 767px;
  margin: 0 auto;
}

.add-form {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 50px;
}
</style>
