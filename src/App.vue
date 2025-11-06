<script setup lang="ts">
import { useTodos } from './composables/useTodos'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'

// Använd composable istället för lokal state!
const { todos, loading, error, currentOperation, addTodo, toggleTodo, deleteTodo } = useTodos()
</script>

<template>
  <TodoInput @addTodo="addTodo"></TodoInput>
  <div v-if="error" class="error">Womp Womp något gick fel</div>
  
  <div v-if="loading && currentOperation" class="loading">{{ currentOperation }}</div>

  <TodoList 
  v-if="!loading && !error"
   :todos="todos" 
   @toggleCompletion="toggleTodo" 
   @delete="deleteTodo"/>
</template>

<style scoped>
</style>
