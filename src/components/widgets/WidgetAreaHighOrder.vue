<template>
  <div
    class="bg-white w-[170px] h-[120px] border border-violet-600 rounded-md cursor-pointer
    transition duration-300 ease-in-out hover:w-[173px] hover:h-[123px]
    "
    style="box-shadow: 0px 15px 10px #1741711a"
    draggable="true"
    @dragstart="drag($event, name || '', 'widgetArea')"
  >


      <div class="flex flex-col items-center justify-center gap-3 h-full px-2">
        <i :class="icon" class="text-violet-700 text-3xl"></i>
        <div class="text-2xl text-violet-700 font-medium">{{ name }}</div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { useDragAndDropStore } from "@/stores/dragAndDrop";

const dragAndDropStore = useDragAndDropStore();

const drag = (event: DragEvent, name: string, area: string) => {
  event.dataTransfer?.setData("text", name);
  dragAndDropStore.drag(event, name, area);
};

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  icon: String,
  description: String,
});

const { name, icon, description } = toRefs(props);
</script>

<style></style>
