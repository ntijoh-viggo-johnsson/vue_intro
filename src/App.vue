<script setup lang="ts">
import TodoItem from './components/TodoItem.vue';
import type { Todo } from './types'

const todo1: Todo = { id: 1, text: "Lära mig Vue", completed: false }
const todo2: Todo = { id: 2, text: "Bygga todo-app", completed: false }
const todo3: Todo = { id: 3, text: "Bli Vue-expert", completed: true }

function handleDelete(id : number) {
    console.log(`Delete event for ${id} recieved`)
}

  function handleToggle(id : number) {
    console.log(`Toggle event for ${id} recieved`)
  }
</script>

<template>
  <TodoItem @delete="handleDelete" @toggleCompletion="handleToggle" :todo="todo1" />
  <TodoItem @delete="handleDelete" @toggleCompletion="handleToggle" :todo="todo2" />
  <TodoItem @delete="handleDelete" @toggleCompletion="handleToggle" :todo="todo3" />
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
