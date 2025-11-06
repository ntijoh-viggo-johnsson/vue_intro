<script setup lang="ts">
import type { Todo } from '../types'
import TodoItem from './TodoItem.vue'
import { computed, ref } from 'vue'

const props = defineProps<{ todos: Todo[] }>()
const emit = defineEmits<{
  toggleCompletion: [id: string]
  delete: [id: string]
}>()

const searchTerm = ref("")
const resultCount = computed(() => filteredTodos.value.length)
const totalCount = computed(() => props.todos.length)
const filterStatus = ref<'all' | 'active' | 'completed'>('all')

const filteredTodos = computed(() => {
    let result = props.todos
    if (searchTerm.value.trim() === '') {
        result = props.todos
    }
    result = props.todos.filter(todo => 
        todo.text.toLowerCase().includes(searchTerm.value.toLowerCase())
    )

    if (filterStatus.value === 'active') {
        result = result.filter(todos => !todos.completed)
    } else if (filterStatus.value === 'completed') {
        result = result.filter(todos => todos.completed)
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

    <input type="radio" v-model="filterStatus" value="all" id="filterAll"/>
    <span><label for="filterAll">Alla</label></span>
    <input type="radio" v-model="filterStatus" value="active" id="filterActive">
    <span><label for="filterActive">Pågående</label></span>
    <input type="radio" v-model="filterStatus" value="completed" id="filterCompleted">
    <span><label for="filterCompleted">Avklarade</label></span>

    <p>Visa {{ resultCount }} av {{ totalCount }}</p>

    <TodoItem
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @toggleCompletion="$emit('toggleCompletion', $event)"
        @delete="$emit('delete', $event)"
        />
  </div>
</template>