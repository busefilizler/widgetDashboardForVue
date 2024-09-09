<script setup lang="ts">
import WidgetAreaLayout from '@/layouts/WidgetAreaLayout.vue'
import WeatherWidget from '@/components/widgets/WeatherWidget.vue'
</script>

<template>
  <WidgetAreaLayout>
    <template #widgets>
      <div class="h-full overflow-x-auto flex items-center gap-9">
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
        <WeatherWidget />
      </div>
    </template>
  </WidgetAreaLayout>
</template>

<style></style>
