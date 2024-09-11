<script setup lang="ts"></script>

<template>
  <div class="w-full min-w-[1200px] h-full flex flex-col px-10 border-4">
    <div class="widgetArea w-full h-1/5">
      <slot name="widgetSide"></slot>
    </div>

    <div class="dashboardArea !w-full min-w-[1200px] h-4/5 bg-violet-50 rounded-md border-violet-900 border">
      <div
        style="box-shadow: 0px 10px 15px #1741711a"
        class="w-full h-full"
      >
        <slot name="dashboardArea"></slot>
      </div>
    </div>
  </div>
</template>
