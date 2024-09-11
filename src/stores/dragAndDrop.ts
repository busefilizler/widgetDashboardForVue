import { ref } from "vue";
import { defineStore } from "pinia";

export interface Widget {
  id: number;
  name: string;
  gridTemp: string;
  icon: string;
  componentName: "TodoWidget" | "WeatherWidget";
}

export const useDragAndDropStore = defineStore("dragAndDrop", () => {
  const widgetAreaItems = ref<Widget[]>([
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

  const dashboardItems = ref<Widget[]>([
  ]);

  const draggedWidget = ref<Widget | null>(null);
  const draggedFrom = ref<string>("");

  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const drag = (event: DragEvent, widget: Widget, area: string) => {
    draggedWidget.value = widget;
    draggedFrom.value = area;
  };

  const drop = (event: DragEvent, area: string) => {
    event.preventDefault();
    if (!draggedWidget.value) return;

    if (draggedFrom.value === "widgetArea" && area === "dashboardArea") {
      moveWidgetToDashboard();
    } else if (draggedFrom.value === "dashboardArea" && area === "widgetArea") {
      moveWidgetToWidgetArea();
    }

    draggedWidget.value = null;
  };

  const moveWidgetToDashboard = () => {
    if (!draggedWidget.value) return;

    const widgetExists = dashboardItems.value.some(
      (item) => item.id === draggedWidget.value?.id
    );
    if (!widgetExists) {
      widgetAreaItems.value = widgetAreaItems.value.filter(
        (item) => item.id !== draggedWidget.value?.id
      );
      dashboardItems.value.push(draggedWidget.value);
    }
  };

  const moveWidgetToWidgetArea = () => {
    if (!draggedWidget.value) return;

    const widgetExists = widgetAreaItems.value.some(
      (item) => item.id === draggedWidget.value?.id
    );
    if (!widgetExists) {
      dashboardItems.value = dashboardItems.value.filter(
        (item) => item.id !== draggedWidget.value?.id
      );
      widgetAreaItems.value.push(draggedWidget.value);
    }
  };
  return {
    widgetAreaItems,
    dashboardItems,
    draggedWidget,
    drag,
    drop,
    allowDrop,
  };
});
