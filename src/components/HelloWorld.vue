<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string, banan: string }>()

const count = ref(0)

function increment() {
  count.value += 1
}

function decrement() {
  count.value -= 1
}

function reset() {
  count.value = 0
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <h1>{{ banan }}</h1>
  <p>count is {{ count }}</p>

  <div class="card">
    <button type="button" @click="increment">increment</button>
  </div>
  <div class="card">
    <button type="button" @click="reset">reset</button>
  </div>
  <div class="card">
    <button type="button" @click="decrement">decrement</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
