<script setup lang="ts">
import WidgetAreaLayout from "@/layouts/WidgetAreaLayout.vue";
import WeatherWidget from "@/components/widgets/WeatherWidget.vue";
import TodoWidget from "@/components/widgets/TodoWidget.vue";
</script>

<template>
  <WidgetAreaLayout>
    <template #widgets>
      <div
        class="h-full overflow-x-auto flex items-center gap-9 bg-violet-100 w-full px-4 border border-violet-700 rounded-md"
        style="box-shadow: 0px 10px 15px #1741711a"
      >
        <WeatherWidget />
        <TodoWidget />
      </div>
    </template>
  </WidgetAreaLayout>
</template>

<style></style>
