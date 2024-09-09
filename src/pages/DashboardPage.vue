<script setup lang="ts">
import DasboardLayout from '@/layouts/DashboardLayout.vue'
import WidgetArea from '@/components/areas/WidgetArea.vue'
import { useDragAndDropStore } from '@/stores/dragAndDrop'
const dragAndDropStore = useDragAndDropStore()
const drop = (event: DragEvent, area: string) => {
  dragAndDropStore.drop(event, area)
}
const allowDrop = (event: DragEvent) => {
  event.preventDefault()
}
</script>

<template>
  <DasboardLayout>
    <template #widgetSide>
      <div class="bg-red-300 h-full overflow-x-auto flex items-center px-10" @drop="drop($event, 'widgetArea')"
      @dragover="allowDrop($event)">
        <WidgetArea />
      </div>
    </template>
    <template #rightSide>
      <div class="rightArea bg-green-300 h-full overflow-y-auto">rightSide</div>
    </template>
    <template #leftSide>
      <div class="leftArea bg-blue-200 h-full overflow-y-auto">leftSide</div>
    </template>
  </DasboardLayout>
</template>

<style></style>
