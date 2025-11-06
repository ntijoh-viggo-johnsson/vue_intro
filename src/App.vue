<script setup lang="ts">
import TodoItem from './components/TodoItem.vue';
import TodoList from './components/TodoList.vue';
import TodoInput from './components/TodoInput.vue';
import type { Todo } from './types'
import { ref } from 'vue'
import { v7 as uuid} from 'uuid'

const todos = ref<Todo[]>([
  { id: uuid(), text: "Lära mig Vue", completed: false },
  { id: uuid(), text: "Bygga todo-app", completed: false },
  { id: uuid(), text: "Bli Vue-expert", completed: true }
  
])

function handleDelete(id : string) {
  todos.value = todos.value.filter(t => t.id !== id)
}

  function handleToggle(id : string) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

function addTodo(text: string) {
  const newTodo: Todo = {
    id: uuid(),
    text: text,
      completed: false
  }
    todos.value.push(newTodo)
}

  console.log(uuid)
</script>

<template>
  <TodoInput @addTodo="addTodo"/>
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
