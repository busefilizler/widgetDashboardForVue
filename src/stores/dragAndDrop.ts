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

  const updateDraggedWidgetSize = (widget: Widgets, areaCovered: number) => {
    widget.gridTemp = areaCovered === 2 ? "col-span-2" : "col-span-1";
  };

  const removePlaceholder = (widgets: Widgets[]) => {
    return widgets.filter((w) => w.name !== "placeholder");
  };

  const createPlaceholder = (
    draggedWidget: Widgets,
    target: HTMLElement | null = null,
    defaults: { gridTemp?: string } = {}
  ): Widgets => ({
    id: 888,
    name: "placeholder",
    componentName: "PlaceholderWidget",
    icon: "",
    xLocation: target?.dataset?.xLocation
      ? parseInt(target.dataset.xLocation)
      : 0,
    yLocation: target?.dataset?.yLocation
      ? parseInt(target.dataset.yLocation)
      : 0,
    areaCovered: target?.dataset?.areaCovered
      ? parseInt(target.dataset.areaCovered)
      : 1,
    gridTemp: draggedWidget.gridTemp || defaults.gridTemp || "col-span-1",
  });


  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
    let areaCovered = 1;
    const dashboardAreaContainer =
      document.querySelector<HTMLElement>(".dashboardArea");

    if (dashboardAreaContainer) {
      const rect = dashboardAreaContainer.getBoundingClientRect();
      const leftBoundary = rect.left + rect.width / 2;
      const rightBoundary = rect.left + (rect.width * 3) / 4;

      if (event.clientX >= leftBoundary && event.clientX <= rightBoundary) {
        areaCovered = 2;
      } else if (
        event.clientX < leftBoundary ||
        event.clientX > rightBoundary
      ) {
        areaCovered = 1;
      }
    }

    if (draggedWidget.value) {
      updateDraggedWidgetSize(draggedWidget.value, areaCovered);
      dashboardItems.value = removePlaceholder(dashboardItems.value);

      const targetElement = event.target as HTMLElement;
      const target =
        (targetElement.closest(".widgetDahboard") as HTMLElement) ||
        (targetElement.closest(".dashboardArea") as HTMLElement);

      if (target) {
        const isWidgetInDashboard = dashboardItems.value.some(
          (item: any) => item.id === draggedWidget.value?.id
        );
        if (!isWidgetInDashboard) {
          const placeholderObj = createPlaceholder(draggedWidget.value, target);
          const dropIndex = getDropTargetIndex(event);

          // Yan yana mı kontrol edelim
          if (dropIndex >= 0 && dropIndex < dashboardItems.value.length) {
            const currentWidget = dashboardItems.value[dropIndex];
            if (currentWidget.gridTemp === "col-span-1" && areaCovered === 1) {
              // Yan yana yerleştir
              dashboardItems.value.splice(dropIndex + 1, 0, placeholderObj);
            } else {
              // Altına yerleştir
              dashboardItems.value.splice(dropIndex, 0, placeholderObj);
            }
          } else {
            // Default ekleme
            dashboardItems.value.splice(dropIndex, 0, placeholderObj);
          }
        }
      } else {
        const defaults = { gridTemp: "col-span-1" };
        if (dashboardItems.value.length === 0) {
          dashboardItems.value.push(
            createPlaceholder(draggedWidget.value, null, defaults)
          );
        }
      }
    }
  };

  const drag = (event: DragEvent, widget: Widgets, area: string) => {
    draggedWidget.value = widget;
    draggedFrom.value = area;

    if (area === "dashboardArea") {
      draggedIndex.value = dashboardItems.value.findIndex(
        (item: Widgets) => item.id === widget.id
      );
    }
  };

  const handleDropOnWidgetArea = () => {
    if (draggedWidget.value) {
      dashboardItems.value = dashboardItems.value.filter(
        (item: any) => item.id !== draggedWidget.value?.id
      );
      if (
        !widgetAreaItemsRef.value.some(
          (item: any) => item.id === draggedWidget.value?.id
        )
      ) {
        widgetAreaItemsRef.value.push(draggedWidget.value);
      }
    }
  };

  const updateWidgetPosition = (widgets: Widgets[]) => {
    let x = 0;
    let y = 0;
    widgets.forEach((widget) => {
      if (widget.gridTemp === "col-span-2") {
        if (x !== 0) y += 1;
        widget.areaCovered = 2;
        widget.xLocation = 0;
        widget.yLocation = y;
      } else if (widget.gridTemp === "col-span-1") {
        widget.areaCovered = 1;
        widget.xLocation = x;
        widget.yLocation = y;
        x = x === 1 ? 0 : x + 1;
        if (x === 0) y += 1;
      }
    });
  };

  const handleDropOnDashboardArea = (targetIndex: number) => {
    if (draggedWidget.value) {
      const isWidgetInDashboard = dashboardItems.value.some(
        (item: any) => item.id === draggedWidget.value?.id
      );
      if (!isWidgetInDashboard) {
        dashboardItems.value = dashboardItems.value.filter(
          (item: any) => item.id !== draggedWidget.value?.id
        );
        dashboardItems.value.splice(targetIndex, 0, draggedWidget.value);
      } else {
        const currentIndex = dashboardItems.value.findIndex(
          (item: any) => item.id === draggedWidget.value?.id
        );
        dashboardItems.value.splice(currentIndex, 1);
        dashboardItems.value.splice(targetIndex, 0, draggedWidget.value);
      }
      updateWidgetPosition(dashboardItems.value);
    }
  };

  const drop = (event: DragEvent, area: string) => {
    event.preventDefault();
    if (area === "widgetArea") {
      handleDropOnWidgetArea();
    } else {
      const targetIndex = getDropTargetIndex(event);
      handleDropOnDashboardArea(targetIndex);
      updateWidgetPosition(dashboardItems.value);
    }
    cleanUp();
  };

  const cleanUp = () => {
    draggedWidget.value = null;
    draggedIndex.value = null;
    draggedFrom.value = "";
    dashboardItems.value = removePlaceholder(dashboardItems.value);
    // delete empty widget from the end of the dashboardItems
    if (
      dashboardItems.value.length > 0 &&
      dashboardItems.value[dashboardItems.value.length - 1].name === "empty"
    ) {
      dashboardItems.value.pop();
    }
  };

  const getDropTargetIndex = (event: DragEvent): number => {
    let targetElement = event.target as HTMLElement;
    const parent = targetElement.closest(".dashboardArea");
    if (!parent) return dashboardItems.value.length; // Eğer parent yoksa, widget'ı sona ekleyin

    const children = Array.from(parent.children);
    while (targetElement && targetElement.parentElement !== parent) {
      targetElement = targetElement.parentElement as HTMLElement;
    }
    return children.indexOf(targetElement);
  };

  return {
    widgetAreaItems: widgetAreaItemsRef,
    dashboardItems,
    draggedWidget,
    drag,
    drop,
    allowDrop,
  };
});
