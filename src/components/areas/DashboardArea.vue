<template>
  <div
    v-if="dashboardItems.length !== 0"
    class="dashboardArea w-full grid grid-cols-2 gap-4 h-fit min-h-[200px]"
    @drop="drop($event, 'dashboardArea')"
    @dragover="handleDragOver($event, 'dashboardArea')"
  >
    <div
      v-for="widget in dashboardItems"
      :key="widget.id"
      class="widget bg-white rounded-lg p-4 border border-violet-900 border-opacity-10"
      :class="[
        widget.gridTemp === 'col-span-2' ? 'col-span-2 w-full' : 'col-span-1',
        'h-auto',
      ]"
      style="box-shadow: 0px 2px 8px #1741711a"
      draggable="true"
      @dragstart="drag($event, widget, 'dashboardArea')"
    >
      <component
        :is="getWidgetComponent(widget.componentName)"
        :gridTemp="widget.gridTemp"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDragAndDropStore } from "@/stores/dragAndDrop";
import { storeToRefs } from "pinia";
import { markRaw } from "vue";
import TodoWidget from "@/components/widgets/TodoWidget.vue";
import WeatherWidget from "@/components/widgets/WeatherWidget.vue";

// Component map with explicit widget component names
const componentMap = {
  TodoWidget: markRaw(TodoWidget),
  WeatherWidget: markRaw(WeatherWidget),
} as const;

const dragAndDropStore = useDragAndDropStore();
const { dashboardItems } = storeToRefs(dragAndDropStore);

// Function to retrieve the correct component
const getWidgetComponent = (componentName: keyof typeof componentMap) => {
  return componentMap[componentName] || null;
};

const drag = (event: DragEvent, widget: any, area: string) => {
  event.dataTransfer?.setData("text", widget);
  dragAndDropStore.drag(event, widget, area);
};

const drop = (event: DragEvent, area: string) => {
  event.dataTransfer?.getData("text");
  dragAndDropStore.drop(event, area);
};

const handleDragOver = (event: DragEvent, area: string) => {
  event.dataTransfer?.setData("text", "widget");
  dragAndDropStore.handleDragOver(event, area);
};
</script>
<style></style>
