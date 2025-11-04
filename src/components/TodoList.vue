<script setup lang="ts">
import type { Todo } from '../types'
import TodoItem from './TodoItem.vue'

const props = defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{
  toggleCompletion: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div>
    <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggleCompletion="$emit('toggleCompletion', $event)"
        @delete="$emit('delete', $event)"
        />
  </div>
</template>