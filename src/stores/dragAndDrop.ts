import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { DefineComponent } from 'vue';
export interface Widget {
  id: number;
  name: string;
  gridTemp: string;
  component: DefineComponent<{}, {}, any>; // or just string if you're passing component name
}
export const useDragAndDropStore = defineStore("dragAndDrop", () => {
  // Widget'ların tanımlandığı ve özelliklerinin belirtildiği veri yapısı

  const widgetAreaItems = ref([
    {
      id: 1,
      name: "ToDo List",
      icon: "fa fa-list-ul",
      componentName: 'TodoWidget',
    },
    {
      id: 2,
      name: "Weather",
      icon: "fa fa-cloud",
      componentName: 'WeatherWidget',
    },
    {
      id: 3,
      name: "Clock",
      icon: "fa fa-clock-o",
    },
    {
      id: 4,
      name: "Calculator",
      icon: "fa fa-calculator",
    },
    {
      id: 5,
      name: "Calendar",
      icon: "fa fa-calendar",
    },
    {
      id: 6,
      name: "News",
      icon: "fa fa-newspaper-o",
    },
    {
      id: 7,
      name: "Stocks",
      icon: "fa fa-line-chart",
    },
    {
      id: 8,
      name: "Currency",
      icon: "fa fa-money",
    },
    {
      id: 9,
      name: "Map",
      icon: "fa fa-map-marker",
    },
    {
      id: 10,
      name: "Music",
      icon: "fa fa-music",
    },
    {
      id: 11,
      name: "Video",
      icon: "fa fa-video-camera",
    },
    {
      id: 12,
      name: "Photo",
      icon: "fa fa-camera",
    },
    {
      id: 13,
      name: "Notes",
      icon: "fa fa-sticky-note",
    },
    {
      id: 14,
      name: "Chat",
      icon: "fa fa-comments",
    },
    {
      id: 15,
      name: "Mail",
      icon: "fa fa-envelope",
    },
  ]);

  // Sol ve sağ paneldeki widget'ları tutan reaktif değişkenler
  const dashboardItems = ref([
    {
      id: 1,
      name: "ToDo List",
      icon: "fa fa-list-ul",
      gridTemp: "col-span-2",
      componentName: 'TodoWidget',
    },
    {
      id: 2,
      name: "Weather",
      icon: "fa fa-cloud",
      gridTemp: "col-span-1",
      componentName: 'WeatherWidget',
    },
  ]);

  // Sürüklenen widget ve kaynağını tutan reaktif değişkenler
  const draggedWidget = ref(null);
  const draggedFrom = ref("");

  const drag = (event: DragEvent, widget: any, side: string) => {
    draggedWidget.value = widget;
  };

  const drop = (event: DragEvent, side: string) => {
    console.log("drop", side);
    event.preventDefault();
    if (side === 'widgetArea') {
      handleDropOnWidgetArea()
    }
  };

  const handleDragOver = (event: DragEvent, side: string) => {
    console.log("drag over", side);
    event.preventDefault();
  };

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDropOnWidgetArea = () => {
      dashboardItems.value = dashboardItems.value.filter(
        (item: { id: number }) =>
          item.id !== (draggedWidget.value as unknown as { id: number })?.id
      );
  };

  const getTargetIndex = (target: any) => {
    const parent = target.closest(".dashboardArea");
    if (parent) {
      const children = Array.from(parent.children);
      while (target && target.parentElement !== parent) {
        target = target.parentElement;
      }
      const index = children.indexOf(target);
      return index;
    }
    return -1;
  };
  
  return {
    drop,
    drag,
    handleDragOver,
    widgetAreaItems,
    dashboardItems,
    draggedWidget,
    draggedFrom,
    allowDrop,
    handleDropOnWidgetArea,
    getTargetIndex,
  };
});
