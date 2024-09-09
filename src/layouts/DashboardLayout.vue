<script setup lang="ts"></script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="widgetArea w-full h-1/6">
      <slot name="widgetSide"></slot>
    </div>

    <div class="dashboardArea flex flex-row w-full h-5/6">
      <div class="w-1/2 h-full">
        <slot name="rightSide"></slot>
      </div>
      <div class="w-1/2 h-full">
        <slot name="leftSide"></slot>
      </div>
    </div>
  </div>
</template>
