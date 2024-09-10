<script setup lang="ts">
import { defineProps, toRefs } from "vue";
const props = defineProps(
  {
    gridTemp: String,
  }
);
const { gridTemp } = toRefs(props);
</script>

<template>
<div :class="gridTemp" class=" h-52 bg-white">todo</div>
</template>
