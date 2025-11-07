<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute } from 'vue-router';
    import { useTodos } from '../composables/useTodos';

const route = useRoute()
const todoId = route.params.id as string // Hämta id

const { todos, loading, error } = useTodos()

const todo = computed(() => {
    return todos.value.find(todo => todo.id === todoId) || null
})
</script>

<template>
    <div v-if="loading">Laddar todo...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="!error && !loading && todo">
        <h2>{{ todo.text }}</h2>
        <p>Status: {{ todo.completed ? 'Klar' : 'Aktiv' }}</p>
        <p>ID: {{ todo.id }}</p>
    </div>
    <div v-if="!todo && !loading && !error">
        Todo hittades inte!❌</div>
</template>