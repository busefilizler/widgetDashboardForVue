import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDragAndDropStore = defineStore("dragAndDrop", () => {
  // Widget'ların tanımlandığı ve özelliklerinin belirtildiği veri yapısı
  const widgetAreaItems = ref([]);

  // Sol ve sağ paneldeki widget'ları tutan reaktif değişkenler
  const leftWidgetsItems = ref([]);
  const rightWidgetsItems = ref([]);

  // Sürüklenen widget ve kaynağını tutan reaktif değişkenler
  const draggedWidget = ref(null);
  const draggedFrom = ref("");


  const drag = (event: DragEvent, widget: any, side: string) => {
    console.log("draggedWidget", event, widget, side);
    draggedWidget.value = widget;
    draggedFrom.value =
      side === "left" ? "left" : side === "right" ? "right" : "";
  }

  const drop = (event: DragEvent, side: string) => {
    event.preventDefault();
  };

  const handleDragOver = (event: DragEvent, side: string) => {
    event.preventDefault();
  }
  const allowDrop = (event: DragEvent) => {
    event.preventDefault()
  }
  return {
    drop,
    drag,
    handleDragOver,
    widgetAreaItems,
    leftWidgetsItems,
    rightWidgetsItems,
    draggedWidget,
    draggedFrom,
    allowDrop
  };
});
