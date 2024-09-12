import { ref } from "vue";
import { defineStore } from "pinia";
import { widgetAreaItems } from "./widgetItems";
import type { Widgets } from "@/types.d.ts";
export const useDragAndDropStore = defineStore("dragAndDrop", () => {
  
  const widgetAreaItemsRef = ref<Widgets[]>(widgetAreaItems);
  const dashboardItems = ref<Widgets[]>([]);
  const draggedWidget = ref<Widgets | null>(null);
  const draggedFrom = ref<string>("");
  const draggedIndex = ref<number | null>(null);

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const drag = (event: DragEvent, widget: Widgets, area: string) => {
    draggedWidget.value = widget;
    draggedFrom.value = area;

    if (area === "dashboardArea") {
      draggedIndex.value = dashboardItems.value.findIndex(
        (item: any) => item.id === widget.id
      );
    }
  };

  const drop = (event: DragEvent, area: string) => {
    event.preventDefault();
    if (!draggedWidget.value) return;

    if (draggedFrom.value === "dashboardArea" && area === "dashboardArea") {
      const dropTargetIndex = getDropTargetIndex(event);
      moveWidgetWithinDashboard(draggedIndex.value, dropTargetIndex);
    } else if (draggedFrom.value === "dashboardArea" && area === "widgetArea") {
      moveWidgetToWidgetArea();
    } else if (draggedFrom.value === "widgetArea" && area === "dashboardArea") {
      moveWidgetToDashboard();
    }
    cleanUp();
  };

  const cleanUp = () => {
    draggedWidget.value = null;
    draggedIndex.value = null;
    draggedFrom.value = "";
  };

  const getDropTargetIndex = (event: DragEvent) => {
    const dashboardArea = document.querySelector(".dashboardArea");
    if (!dashboardArea) return 0;

    const widgets = Array.from(dashboardArea.querySelectorAll(".widget"));

    const mouseY = event.clientY;
    for (let i = 0; i < widgets.length; i++) {
      const widgetRect = widgets[i].getBoundingClientRect();
      if (mouseY < widgetRect.top + widgetRect.height / 2) {
        return i;
      }
    }
    return widgets.length;
  };

  const moveWidgetWithinDashboard = (
    fromIndex: number | null,
    toIndex: number
  ) => {
    if (fromIndex === null || fromIndex === toIndex) return;

    const widgetToMove = dashboardItems.value[fromIndex];
    dashboardItems.value.splice(fromIndex, 1);
    dashboardItems.value.splice(toIndex, 0, widgetToMove);
  };

  const moveWidgetToDashboard = () => {
    if (!draggedWidget.value) return;
    dashboardItems.value.push(draggedWidget.value);
  };

  const moveWidgetToWidgetArea = () => {
    if (!draggedWidget.value) return;

    dashboardItems.value = dashboardItems.value.filter(
      (item) => item.id !== draggedWidget.value?.id
    );

    const widgetExistsInArea = widgetAreaItemsRef.value.some(
      (item) => item.id === draggedWidget.value?.id
    );
    if (!widgetExistsInArea) {
      widgetAreaItemsRef.value.push(draggedWidget.value);
    }
  };

  return {
    widgetAreaItems: widgetAreaItemsRef,
    dashboardItems,
    draggedWidget,
    drag,
    drop,
    allowDrop,
    moveWidgetWithinDashboard,
  };
});
