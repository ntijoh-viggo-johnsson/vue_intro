<script setup lang="ts">
    import { computed, onMounted } from 'vue'
    import { useRoute } from 'vue-router';
    import { useTodosStore } from '../stores/useTodosStore';

const route = useRoute()

const todosStore = useTodosStore()
onMounted(() => { todosStore.initialized() })

const todoId = route.params.id as string // Hämta id


const todo = computed(() => {
    return todosStore.getTodoById(todoId)
})

function handleToggle() {
    todosStore.toggleTodo(todoId)
}

function handleDelete() {
    todosStore.deleteTodo(todoId)
}
</script>

<template>
    <router-link :to="{name: 'todos'}">← Tillbaka till todos</router-link>

    <div v-if="todosStore.loading">Laddar todo...</div>
    <div v-if="todosStore.error">{{ todosStore.error }}</div>

    <div v-if="!todosStore.error && !todosStore.loading && todo">
        <h2>{{ todo.text }}</h2>
        <p>Status: {{ todo.completed ? 'Klar' : 'Aktiv' }}</p>
        <p>ID: {{ todo.id }}</p>

        <div>
        <button @click="handleToggle">
          {{ todo.completed ? 'Markera som aktiv' : 'Markera som färdig' }}
        </button>
        <button @click="handleDelete">Ta bort</button>
      </div>
    </div>
    <div v-if="!todo && !todosStore.loading && !todosStore.error">
        Todo hittades inte!❌</div>
</template>