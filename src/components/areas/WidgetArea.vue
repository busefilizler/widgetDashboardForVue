<script setup lang="ts">
import WidgetAreaLayout from "@/layouts/WidgetAreaLayout.vue";
import WidgetAreaHighOrder from "@/components/widgets/WidgetAreaHighOrder.vue";
</script>

<template>
  <WidgetAreaLayout>
    <template #widgets>
      <div
        class="h-full overflow-x-auto flex items-center gap-9 bg-violet-100 w-full px-4 border border-violet-900 rounded-md"
        style="box-shadow: 0px 10px 15px #1741711a"
      >
        <WidgetAreaHighOrder />
      </div>
    </template>
  </WidgetAreaLayout>
</template>

<style></style>
