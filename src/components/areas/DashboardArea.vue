<template>
  <div
    class="dashboardArea w-full grid grid-cols-2 gap-4 h-fit min-h-[200px] border border-dashed border-gray-300"
    @drop="drop($event, 'dashboardArea')"
    @dragover="allowDrop($event)"
  >
    <div
      v-if="dashboardItems.length === 0"
      class="text-center flex justify-center items-center text-gray-500 col-span-2 border-dashed border-4 border-violet-900 flex-col gap-4"
    >
      <i class="fa-solid fa-square-plus text-violet-900 text-4xl"></i>
      <div class="text-lg text-violet-900">Drag and drop widgets here</div>
    </div>
    <div
      v-for="widget in dashboardItems"
      :key="widget.id"
      class="widgetDahboard rounded-lg border border-violet-900 border-opacity-10 min-h-[200px]"
      :class="[
        widget.name === 'empty' ? 'opacity-10' : '',
        widget.gridTemp === 'col-span-2' ? 'col-span-2 w-full' : 'col-span-1',
        'h-auto',
      ]"
      draggable="true"
      @dragstart="drag($event, widget, 'dashboardArea')"
    >
      <component
        class="rounded-lg p-3"
        :class="widget.name === 'empty' ? 'opacity-0' : ''"
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
import MotivationWidget from "@/components/widgets/MotivationWidget.vue";
import TimeWidget from "@/components/widgets/TimeWidget.vue";
import PlaceholderWidget from "../widgets/PlaceholderWidget.vue";
import EmptyWidget from "../widgets/EmptyWidget.vue";
const componentMap = {
  TodoWidget: markRaw(TodoWidget),
  WeatherWidget: markRaw(WeatherWidget),
  MotivationWidget: markRaw(MotivationWidget),
  TimeWidget: markRaw(TimeWidget),
  PlaceholderWidget: markRaw(PlaceholderWidget),
  EmptyWidget: markRaw(EmptyWidget),
} as const;

const dragAndDropStore = useDragAndDropStore();
const { dashboardItems } = storeToRefs(dragAndDropStore);

const getWidgetComponent = (componentName: keyof typeof componentMap) => {
  return componentMap[componentName] || null;
};

const drag = (event: DragEvent, widget: any, area: string) => {
  dragAndDropStore.drag(event, widget, area);
};

const drop = (event: DragEvent, area: string) => {
  dragAndDropStore.drop(event, area);
};

const allowDrop = (event: DragEvent) => {
  dragAndDropStore.allowDrop(event);
};
</script>
