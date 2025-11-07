<script setup lang="ts">
import { useTodos } from '../composables/useTodos'
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import { useRoute } from 'vue-router'    
import { computed } from 'vue'
import type { Todo } from '../types'

// Använd composable istället för lokal state!
const { todos, loading, error, currentOperation, addTodo, toggleTodo, deleteTodo } = useTodos()
const route = useRoute()
const filteredTodos = computed<Todo[]>(() => {
    const filter = route.query.filter

    if (filter === 'all' || filter === undefined)
        return todos.value
    else if (filter === 'active')
        return todos.value.filter(todo => !todo.completed)
    else
        return todos.value.filter(todo => todo.completed)
})
</script>
<template>
    <router-link :to="{name: 'home'}">← Hem</router-link>

    <nav class="filter-nav">
        <router-link :to="{ name: 'todos' }">Alla |</router-link>
        <router-link :to="{ name: 'todos', query: { filter: 'active'} }"> Aktiva |</router-link>
        <router-link :to="{ name: 'todos', query: { filter: 'completed'} }"> Avklarade</router-link>
    </nav>

    <TodoInput @addTodo="addTodo"></TodoInput>

  <div v-if="error" class="error">Womp Womp något gick fel</div>
  <div v-if="loading && currentOperation" class="loading">{{ currentOperation }}</div>

  <TodoList 
  v-if="!loading && !error"
   :todos="filteredTodos" 
   @toggleCompletion="toggleTodo" 
   @delete="deleteTodo"/>
</template>