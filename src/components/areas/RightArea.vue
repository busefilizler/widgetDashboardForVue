<template>
  <div
    @drop="drop($event, 'right')"
    @dragover="handleDragOver($event, 'right')"
  >
    right
  </div>
</template>
<script setup lang="ts">
import { useDragAndDropStore } from "@/stores/dragAndDrop";
const dragAndDropStore = useDragAndDropStore();
const drop = (event: DragEvent, area: string) => {
  event.dataTransfer?.getData("text");
  dragAndDropStore.drop(event, area);
};
const handleDragOver = (event: DragEvent, area: string) => {
  console.log("drag over", area);
  event.dataTransfer?.setData("text", "widget");
  dragAndDropStore.allowDrop(event);
};
</script>
<style></style>
