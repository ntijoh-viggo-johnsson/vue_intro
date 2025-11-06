<script setup lang="ts">
import type { Todo } from '../types'

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits < {
    toggleCompletion: [id: string]
    delete: [id: string]
}>()

function handleToggle() {
    emit('toggleCompletion', props.todo.id)
}

function handleDelete() {
    emit('delete', props.todo.id)
}
</script>

<template>
    <div class="banan">
        <span :class="{completed: todo.completed}">{{ todo.text }}</span>
        <input type="checkbox" :checked="props.todo.completed" @change="handleToggle"></input>
        <button @click="handleDelete">Delete</button>
    </div>
</template>

<style scoped>
.banan {
    display: flex;
}

.completed {
    text-decoration: line-through;
}
</style>