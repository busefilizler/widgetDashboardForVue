import { ref } from "vue";
import { defineStore } from "pinia";

export interface Widget {
  id: number;
  name: string;
  gridTemp: string;
  icon: string; // Add icon
  componentName: "TodoWidget" | "WeatherWidget"; // Restrict to specific components
}

export const useDragAndDropStore = defineStore("dragAndDrop", () => {
  const widgetAreaItems = ref([
    {
      id: 1,
      name: "ToDo List",
      icon: "fa fa-list-ul",
      componentName: "TodoWidget",
    },
    {
      id: 2,
      name: "Weather",
      icon: "fa fa-cloud",
      componentName: "WeatherWidget",
    },
  ]);

  const dashboardItems = ref([
    {
      id: 1,
      name: "ToDo List",
      icon: "fa fa-list-ul",
      gridTemp: "col-span-2",
      componentName: "TodoWidget",
    },
    {
      id: 2,
      name: "Weather",
      icon: "fa fa-cloud",
      gridTemp: "col-span-1",
      componentName: "WeatherWidget",
    },
  ]);

  const draggedWidget = ref<Widget | null>(null);
  const lastDragOverEvent = ref<DragEvent | null>(null);

  const drag = (event: DragEvent, widget: Widget, area: string) => {
    draggedWidget.value = widget;
  };

  const drop = (event: DragEvent, side: string) => {
    event.preventDefault();
    const targetIndex = getTargetIndex(event.target);

    if (side === "dashboardArea" && draggedWidget.value) {
      if (
        !dashboardItems.value.some(
          (item) => item.id === draggedWidget.value?.id
        )
      ) {
        dashboardItems.value.splice(targetIndex, 0, draggedWidget.value);
      }
    }
  };

  const handleDragOver = (event: DragEvent, area: string) => {
    event.preventDefault();
    lastDragOverEvent.value = event;
  };

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const handleDropOnWidgetArea = () => {
    if (draggedWidget.value) {
      dashboardItems.value = dashboardItems.value.filter(
        (item) => item.id !== draggedWidget.value?.id
      );
    }
  };

  const getTargetIndex = (target: any) => {
    const parent = target.closest(".dashboardArea");
    if (parent) {
      const children = Array.from(parent.children);
      let targetIndex = children.indexOf(target);
      if (targetIndex === -1) {
        targetIndex = children.length; // Add to the last position
      }
      return targetIndex;
    }
    return -1;
  };

  return {
    drop,
    drag,
    handleDragOver,
    allowDrop,
    handleDropOnWidgetArea,
    widgetAreaItems,
    dashboardItems,
    draggedWidget,
    lastDragOverEvent,
  };
});
