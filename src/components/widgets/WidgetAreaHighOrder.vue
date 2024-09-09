<template>
  <div
    class="bg-white w-44 h-32"
    draggable="true"
    @dragstart="drag($event, name || '', 'widgetArea')"
  >
    <div class="flex flex-col items-center justify-center">
      <div class="text-2xl">{{ name }}</div>
      <div class="text-2xl">{{ icon }}</div>
      <div class="text-2xl">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { useDragAndDropStore } from "@/stores/dragAndDrop";

const dragAndDropStore = useDragAndDropStore();

const drag = (event: DragEvent, name: string, area: string) => {
  event.dataTransfer?.setData("text", name); // Bu satır, widget bilgisini dataTransfer'e ekler
  dragAndDropStore.drag(event, name, area);
};

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  icon: String,
  description: String,
});

const { name, icon, description } = toRefs(props);
</script>

<style></style>
