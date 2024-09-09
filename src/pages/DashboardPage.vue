<script setup lang="ts">
import DasboardLayout from '@/layouts/DashboardLayout.vue'
import WidgetArea from '@/components/areas/WidgetArea.vue'
</script>

<template>
  <DasboardLayout>
    <template #widgetSide>
      <div class="bg-red-300 h-full overflow-x-auto flex items-center px-10">
        <WidgetArea />
      </div>
    </template>
    <template #rightSide>
      <div class="rightArea bg-green-300 h-full overflow-y-auto">fvr</div>
    </template>
    <template #leftSide>
      <div class="leftArea bg-blue-200 h-full overflow-y-auto">dbt</div>
    </template>
  </DasboardLayout>
</template>

<style></style>
