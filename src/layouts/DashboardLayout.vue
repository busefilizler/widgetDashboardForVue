<script setup lang="ts"></script>

<template>
  <div class="w-full h-full flex flex-col px-10 border-4">
    <div class="widgetArea w-full h-1/5">
      <slot name="widgetSide"></slot>
    </div>

    <div class="dashboardArea !w-full h-4/5 bg-violet-50 ">
      <div
        style="box-shadow: 0px 10px 15px #1741711a"
        class="w-full h-full"
      >
        <slot name="rightSide"></slot>
      </div>
    </div>
  </div>
</template>
