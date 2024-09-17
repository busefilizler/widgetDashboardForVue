<script setup lang="ts"></script>

<template>
  <div class="w-full min-w-[1200px] h-full flex flex-col">
    <div class="widgetArea w-full h-1/4">
      <slot name="widgetSide"></slot>
    </div>

    <div class="dashboardArea !w-full min-w-[1200px] h-3/4 bg-violet-50 rounded-md border-violet-900 border mb-6">
      <div
        style="box-shadow: 0px 10px 15px #1741711a"
        class="w-full h-full"
      >
        <slot name="dashboardArea"></slot>
      </div>
    </div>
  </div>
</template>
