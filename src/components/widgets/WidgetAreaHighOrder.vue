<template>
  <div class="bg-white w-44 h-32">
    <div class="flex flex-col items-center justify-center">
      <div class="text-2xl">{{ name }}</div>
      <div class="text-2xl">{{ icon }}</div>
      <div class="text-2xl">{{ description }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, toRefs } from 'vue'

const props = defineProps({
  name: String,
  icon: String,
  description: String
})
const { name, icon, description } = toRefs(props)
</script>
<style></style>
