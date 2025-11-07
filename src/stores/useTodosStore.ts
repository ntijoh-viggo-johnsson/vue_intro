import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Todo } from "../types";

export const useTodosStore = defineStore('todos', () => {
    const todos = ref<Todo[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const isInitialized = ref(false)
    const API_BASE = "http://localhost:3000/api"

    const activeTodos = computed(() => {
        return todos.value.filter(todo => !todo.completed)
    })

    const completedTodos = computed(() => {
        return todos.value.filter(todo => todo.completed)
    })

    const allTodos = computed(() => {
        return todos.value
    })

    function getTodoById(id: string) {
        return todos.value.find(todo => todo.id === id) || null
    }

    async function initialized() {
        if (!isInitialized.value)
            await fetchTodos()
            isInitialized.value = true
    }

    async function fetchTodos() {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_BASE}/todos`)
            if (!response.ok) 
                throw new Error(`HTTP error! status ${response.status}`)

            todos.value = await response.json()
        } catch (err) {
            error.value = 'Kunde inte hämta todos'
            console.error('Fetch error:', err)
        } finally {
            loading.value = false
        }
    }

    async function addTodo(text: string) {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_BASE}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, completed: false})
            })

            if (!response.ok)
                throw new Error(`HTTP error! status ${response.status}`)

            const newTodo = await response.json();
            todos.value.push(newTodo)
        } catch (err) {
            error.value = 'Kunde inte skapa todo'
            console.error('Add error', err)
        } finally {
            loading.value = false
        }
    }

    async function toggleTodo(id: string) {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok)
                throw new Error(`HTTP error! status ${response.status}`)

            const updatedTodo = await response.json();
            const index = todos.value.findIndex(todos => todos.id === id)
            if (index !== -1)
                todos.value[index] = updatedTodo
        } catch (err) {
            error.value = 'Kunde inte uppdatera todo'
            console.error('Toggle error', err)
        } finally {
            loading.value = false
        }
    }

    async function deleteTodo(id: string) {
        loading.value = true
        error.value = null

        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            if (!response.ok)
                throw new Error(`HTTP error! status ${response.status}`)

            todos.value = todos.value.filter(todo => todo.id !== id)
        } catch (err) {
            error.value = 'Kunde inte ta bort todo'
            console.error('Delete error', err)
        } finally {
            loading.value = false
        }
    }
    
    return {
        todos,
        loading,
        error,

        fetchTodos,
        initialized,
        addTodo,
        toggleTodo,
        deleteTodo,

        activeTodos,
        completedTodos,
        allTodos,
        getTodoById
    }
})