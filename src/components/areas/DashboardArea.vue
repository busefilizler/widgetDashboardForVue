<template>
  <div
    v-if="rightWidgetsItems.length !== 0"
    @drop="drop($event, 'dashboardArea')"
    class="dashboardArea w-full grid grid-cols-2 gap-4 h-fit min-h-[200px]"
    @dragover="handleDragOver($event, 'dashboardArea')"
  >
    <div
      v-for="widget in rightWidgetsItems"
      :key="widget.id"
      :class="[
        widget.gridTemp === 'col-span-2' ? 'col-span-2 w-full' : 'col-span-1',
        'h-auto'
      ]"
      style="box-shadow: 0px 2px 8px #1741711a"
      draggable="true"
    >
      <component :is="widget.component" :gridTemp="widget.gridTemp" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDragAndDropStore } from "@/stores/dragAndDrop";
import { storeToRefs } from "pinia";

const dragAndDropStore = useDragAndDropStore();
const { rightWidgetsItems } = storeToRefs(dragAndDropStore);

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
