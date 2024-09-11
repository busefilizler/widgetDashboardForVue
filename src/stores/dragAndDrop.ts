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
  const draggedIndex = ref<number | null>(null); 
  const allowDrop = (event: DragEvent) => {
    event.preventDefault();
  };

  const drag = (event: DragEvent, widget: Widget, area: string) => {
    draggedWidget.value = widget;
    draggedFrom.value = area;

    if (area === "dashboardArea") {
      draggedIndex.value = dashboardItems.value.findIndex(
        (item) => item.id === widget.id
      );
    }
  };

  const drop = (event: DragEvent, area: string) => {
    event.preventDefault();
    if (!draggedWidget.value) return;

    if (draggedFrom.value === "dashboardArea" && area === "dashboardArea") {
      // Aynı alan içinde yer değiştiriyoruz
      const dropTargetIndex = getDropTargetIndex(event);
      moveWidgetWithinDashboard(draggedIndex.value, dropTargetIndex);
    } else if (draggedFrom.value === "dashboardArea" && area === "widgetArea") {
      moveWidgetToWidgetArea();
    } else if (draggedFrom.value === "widgetArea" && area === "dashboardArea") {
      moveWidgetToDashboard();
    }

    // Drag işlemi bitince sıfırla
    draggedWidget.value = null;
    draggedIndex.value = null;
  };

  const getDropTargetIndex = (event: DragEvent) => {
    const dashboardArea = document.querySelector('.dashboardArea');
    if (!dashboardArea) return 0;

    const widgets = Array.from(dashboardArea.querySelectorAll('.widget'));

    const mouseY = event.clientY;
    for (let i = 0; i < widgets.length; i++) {
      const widgetRect = widgets[i].getBoundingClientRect();
      if (mouseY < widgetRect.top + widgetRect.height / 2) {
        return i;
      }
    }
    return widgets.length;
  };

  const moveWidgetWithinDashboard = (fromIndex: number | null, toIndex: number) => {
    if (fromIndex === null || fromIndex === toIndex) return;

    const widgetToMove = dashboardItems.value[fromIndex];
    dashboardItems.value.splice(fromIndex, 1); // Eski pozisyondan kaldır
    dashboardItems.value.splice(toIndex, 0, widgetToMove); // Yeni pozisyona ekle
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
    const widgetExistsInArea = widgetAreaItems.value.some(
      (item) => item.id === draggedWidget.value?.id
    );
    if (!widgetExistsInArea) {
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
    moveWidgetWithinDashboard,
  };
});