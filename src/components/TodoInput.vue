<script setup lang="ts">
import { ref } from 'vue'

const newTodoText = ref('')

const emit = defineEmits <{
    addTodo: [text: string]
}>()

function handleSubmit() {
    if (newTodoText.value.trim() === '')
        return; // Abort
    else (emit('addTodo', newTodoText.value))
        newTodoText.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="newTodoText" type="text" placeholder="Vad behöver göras?">
    <button type="submit">Lägg till</button>
  </form>
</template>

<style scoped>
</style>