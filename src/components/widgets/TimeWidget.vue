<script setup lang="ts">
import { ref, onMounted, defineProps, toRefs } from 'vue';
const props = defineProps(
  {
    gridTemp: String,
  }
);
const { gridTemp } = toRefs(props);
// Define a reactive variable to store the current time
const currentTime = ref<string>('');

// Function to update the current time
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString(); // Format the time as a string
};

// Update the time on component mount and set an interval to update every second
onMounted(() => {
  updateTime(); // Set the initial time
  setInterval(updateTime, 1000); // Update the time every second
});
</script>

<template>
  <div :class="gridTemp" class="h-52 bg-white flex items-center justify-center text-center p-4 flex-col gap-4">
    <div class="text-6xl text-violet-900">Current Time</div>
    <div class="border-2 border-violet-900 flex px-3 py-1 text-5xl rounded-md w-64 items-center">
      <div>
        <i class="fa-solid fa-clock text-violet-900"></i>
      </div>
      <div class="text-violet-900">{{ currentTime }}</div>
    </div>
  </div>
</template>
