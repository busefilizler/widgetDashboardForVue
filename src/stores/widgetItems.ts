import type { Widgets } from "@/types.d.ts";
  
  export const widgetAreaItems : Widgets[] = [
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
    icon: "fa fa-cloud-sun-rain",
    gridTemp: "col-span-1",
    componentName: "WeatherWidget",
  },
  {
    id: 3,
    name: "Motivation",
    icon: "fa fa-sun",
    gridTemp: "col-span-1",
    componentName: "MotivationWidget",
  },
  {
    id: 4,
    name: "Time",
    icon: "fa-solid fa-clock",
    gridTemp: "col-span-1",
    componentName: "TimeWidget",
  },
];