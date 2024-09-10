<script setup lang="ts">
import DasboardLayout from '@/layouts/DashboardLayout.vue'
import WidgetArea from '@/components/areas/WidgetArea.vue'
import DashboardArea from '@/components/areas/DashboardArea.vue'
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
      <div class=" h-full overflow-x-auto flex items-center" @drop="drop($event, 'widgetArea')"
      @dragover="allowDrop($event)">
        <WidgetArea />
      </div>
    </template>
    <template #dashboardArea>
      <div class="dashboardArea h-full w-full px-4 py-4 overflow-y-auto">
        <DashboardArea />
      </div>
    </template>

  </DasboardLayout>
</template>

<style></style>
