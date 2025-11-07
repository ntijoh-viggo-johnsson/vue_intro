<script setup lang="ts">
import TodoInput from '../components/TodoInput.vue'
import TodoList from '../components/TodoList.vue'
import { useRoute } from 'vue-router'    
import { onMounted, computed } from 'vue'
import type { Todo } from '../types'
import { useTodosStore } from '../stores/useTodosStore'

// Använd composable istället för lokal state!
const route = useRoute()

const todosStore = useTodosStore()

onMounted(() => { todosStore.initialized() })

const filter = computed(() =>  route.query.filter as string | undefined )
</script>
<template>
    <router-link :to="{name: 'home'}">← Hem</router-link>

    <nav class="filter-nav">
        <router-link :to="{ name: 'todos' }">Alla |</router-link>
        <router-link :to="{ name: 'todos', query: { filter: 'active'} }"> Aktiva |</router-link>
        <router-link :to="{ name: 'todos', query: { filter: 'completed'} }"> Avklarade</router-link>
    </nav>

    <TodoInput @addTodo="todosStore.addTodo"></TodoInput>

    <TodoList :filter="filter"></TodoList>
</template>