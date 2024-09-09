<script setup lang="ts">
import DasboardLayout from '@/layouts/DashboardLayout.vue'
import WidgetArea from '@/components/areas/WidgetArea.vue'
import RightArea from '@/components/areas/RightArea.vue'
import LeftArea from '@/components/areas/LeftArea.vue'
import { useDragAndDropStore } from '@/stores/dragAndDrop'

const dragAndDropStore = useDragAndDropStore()

const drop = (event: DragEvent, area: string) => {
  event.dataTransfer?.getData('text')
  dragAndDropStore.drop(event, area)
}

const allowDrop = (event: DragEvent) => {
  event.dataTransfer?.setData('text', 'widget')
  dragAndDropStore.allowDrop(event)
}
</script>

<template>
  <DasboardLayout>
    <template #widgetSide>
      <div class=" h-full overflow-x-auto flex items-center px-10" @drop="drop($event, 'widgetArea')"
      @dragover="allowDrop($event)">
        <WidgetArea />
      </div>
    </template>
    <template #leftSide>
      <div class="leftArea bg-blue-200 h-full overflow-y-auto">
        <LeftArea />
      </div>
    </template>
    <template #rightSide>
      <div class="rightArea bg-green-300 h-full overflow-y-auto">
        <RightArea />
      </div>
    </template>

  </DasboardLayout>
</template>

<style></style>
