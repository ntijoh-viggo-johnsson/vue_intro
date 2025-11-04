<script setup lang="ts">
import TodoItem from './components/TodoItem.vue';
import TodoList from './components/TodoList.vue';
import type { Todo } from './types'
import { ref } from 'vue'

const todos = ref<Todo[]>([
  { id: 1, text: "Lära mig Vue", completed: false },
  { id: 2, text: "Bygga todo-app", completed: false },
  { id: 3, text: "Bli Vue-expert", completed: true }
  
])

function handleDelete(id : number) {
  todos.value = todos.value.filter(t => t.id !== id)
}

  function handleToggle(id : number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }
</script>

<template>
  <TodoList :todos="todos"
  @delete="handleDelete"
  @toggleCompletion="handleToggle"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
