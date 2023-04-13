<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
const props = defineProps<{
  index: number
  content: string
  handleEditTodo: (newContent: string, index: number) => void
  handleDeleteTodo: (index: number) => void
}>()

console.log(props.content)

const newContent = ref(props.content)
const refContent = ref<HTMLInputElement>()
const state = reactive({ showForm: false })

async function updateShowForm(status: boolean) {
  state.showForm = status
  await nextTick()
  refContent.value?.focus()
}

function handleEdit() {
  props.handleEditTodo(newContent.value, props.index)
  updateShowForm(false)
}

function handleDelete() {
  props.handleDeleteTodo(props.index)
}
</script>

<template>
  <form @submit.prevent="handleEdit">
    <div class="todo-item">
      <p v-if="!state.showForm">{{ content }}</p>
      <input type="text" v-model="newContent" v-else ref="refContent" />
      <div class="action-btns">
        <button
          @click="() => updateShowForm(true)"
          class="btn btn-warning"
          v-if="!state.showForm"
          type="button"
        >
          Edit
        </button>
        <button @click="() => updateShowForm(false)" class="btn btn-secondary" v-else type="button">
          Close
        </button>

        <button @click="handleDelete" class="btn btn-danger" v-if="!state.showForm" type="button">
          Delete
        </button>
        <button type="submit" class="btn btn-primary" v-else>Save</button>
      </div>
    </div>
  </form>
</template>

<style scoped>
input {
  max-width: 100%;
}
.todo-item {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #efefef;
}
.action-btns {
  display: flex;
  gap: 10px;
}
</style>
