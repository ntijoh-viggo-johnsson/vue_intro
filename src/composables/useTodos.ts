import { ref, onMounted } from 'vue'
import type { Todo } from '../types/api-types'

export function useTodos() {
  // State (precis som tidigare i App.vue)
    const todos = ref<Todo[]>([])
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)
    const currentOperation = ref<string | null>(null)

  // Bas-URL för API
  const API_BASE = 'http://localhost:3000/api'

  // TODO: Implementera funktionerna nedan
  onMounted(() => {
      fetchTodos()
  })
    
    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

// TODO: Lägg till funktioner här
    async function fetchTodos() {
        loading.value = true
        error.value = null
        currentOperation.value = 'Hämtar todos...'

        try {
            const response = await fetch(`${API_BASE}/todos?delay=2000`)

            if (!response.ok) 
                throw new Error(`HTTP error! status ${response.status}`)

            todos.value = await response.json()
        } catch (err) {
            error.value = 'Kunde inte hämta todos'
            console.error('Fetch error', err)
        } finally {
            loading.value = false
            currentOperation.value = ''
        }
    }

    async function addTodo(text: string) {
        loading.value = true;
        error.value = null;
        currentOperation.value = 'Lägger till todo..'
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
            error.value = 'Kunde inte lägga till todo'
            console.error('Add error', err)
        } finally {
            await delay(1000)
            loading.value = false;
            currentOperation.value = ''
        }
    }

    async function toggleTodo(id: string) {
        loading.value = true;
        error.value = null;
        currentOperation.value = 'Uppdaterar todo..'
        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'}
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
            await delay(500)
            loading.value = false;
            currentOperation.value = ''
        }
    }

    async function deleteTodo(id: string) {
        loading.value = true;
        error.value = null;
        currentOperation.value = 'Tar bort todo..'

        try {
            const response = await fetch(`${API_BASE}/todos/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            })
            if (!response.ok) 
                throw new Error(`HTTP error! status ${response.status}`)

            todos.value = todos.value.filter(todo => todo.id !== id)
        } catch (err) {
            error.value = 'Kunde inte ta bort todo'
            console.error('Delete error')
        } finally {
            await delay(500)
            loading.value = false;
            currentOperation.value = ''
        }
    }

    return {
        todos,
        loading,
        error,
        currentOperation,
        fetchTodos,
        addTodo,
        deleteTodo,
        toggleTodo
    }
}