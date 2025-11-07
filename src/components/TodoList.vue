<script setup lang="ts">
import type { Todo } from '../types'
import TodoItem from './TodoItem.vue'
import { computed, ref, onMounted } from 'vue'
import { useTodosStore } from '../stores/useTodosStore'



const props = defineProps<{ filter?: string }>()
const todosStore = useTodosStore()

onMounted(() => { todosStore.initialized() })
// const emit = defineEmits<{
//   toggleCompletion: [id: string]
//   delete: [id: string]
// }>()

const searchTerm = ref("")
// const resultCount = computed(() => filteredTodos.value.length)
// const totalCount = computed(() => props.todos.length)
// const filterStatus = ref<'all' | 'active' | 'completed'>('all')

const filteredTodos = computed(() => {
    let result = todosStore.todos

    if (props.filter === 'active') {
        result = todosStore.activeTodos
    } else if (props.filter === 'completed') {
        result = todosStore.completedTodos
    }

    if (searchTerm.value.trim() !== '') {
        result = result.filter(todo => todo.text.toLowerCase().includes(searchTerm.value.toLowerCase()))
    }

    return result
})
</script>

<template>
  <div>
    <input
    v-model="searchTerm"
    type="text"
    placeholder="Sök todos..."
    />

    <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggleCompletion="todosStore.toggleTodo"
        @delete="todosStore.deleteTodo"
        />
  </div>
</template>