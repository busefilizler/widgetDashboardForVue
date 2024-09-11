import { ref } from "vue";
import { defineStore } from "pinia";
export interface Widget {
  id: number;
  name: string;
  gridTemp: string;
  component: string;
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
    // Diğer widget'lar...
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

  const drag = (event: DragEvent, widget: Widget) => {
    draggedWidget.value = widget;
  };

  const drop = (event: DragEvent, side: string) => {
    event.preventDefault();
    const targetIndex = getTargetIndex(event.target);

    if (side === "dashboardArea" && draggedWidget.value) {
      // Zaten dashboard'ta olan bir widget'ı yeniden eklemeyin
      if (
        !dashboardItems.value.some(
          (item) => item.id === draggedWidget.value?.id
        )
      ) {
        dashboardItems.value.splice(targetIndex, 0, draggedWidget.value);
      }
    }
  };

  const handleDragOver = (event: DragEvent) => {
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
        targetIndex = children.length; // Son sıraya ekle
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
