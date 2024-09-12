<template>
  <WidgetAreaLayout>
    <template #widgets>
      <div
        class="h-full overflow-x-auto flex items-center gap-9 bg-violet-100 w-full px-4 border border-violet-900 rounded-md widgetParent"
        style="box-shadow: 0px 10px 15px #1741711a"
        @drop="drop($event, 'widgetArea')"
        @dragover="allowDrop($event)"
      >
        <div
          v-for="widget in widgetAreaItems"
          :key="widget.id"
          class="bg-white w-[170px] min-w-[170px] h-[120px] border border-violet-900 rounded-md cursor-pointer transition duration-300 ease-in-out hover:w-[173px] hover:h-[123px] "
          style="box-shadow: 0px 15px 10px #1741711a"
          :class="{ ghost: isWidgetInDashboard(widget.id) }"
          draggable="true"
          @dragstart="drag($event, widget, 'widgetArea')"
        >
          <div
            class="flex flex-col items-center justify-center gap-3 h-full px-2"
          >
            <i :class="widget.icon" class="text-violet-900 text-3xl"></i>
            <div class="text-2xl text-violet-900 font-medium">
              {{ widget.name }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </WidgetAreaLayout>
</template>
<script setup lang="ts">
import WidgetAreaLayout from "@/layouts/WidgetAreaLayout.vue";
import { useDragAndDropStore } from "@/stores/dragAndDrop";
import { storeToRefs } from "pinia";
const dragAndDropStore = useDragAndDropStore();
const { widgetAreaItems, dashboardItems } = storeToRefs(dragAndDropStore);

const drop = (event: DragEvent, side: string) => {
  dragAndDropStore.drop(event, side);
};
const drag = (event: DragEvent, widget: any, area: string) => {
  dragAndDropStore.drag(event, widget, area);
};
const allowDrop = (event: DragEvent) => {
  event.preventDefault();
};
const isWidgetInDashboard = (widgetId: number) => {
  return dashboardItems.value.some((widget) => widget.id === widgetId);
};
</script>
<style>
.ghost {
  opacity: 0.5;
  pointer-events: none;
}
</style>
