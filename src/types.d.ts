export interface Widgets {
  id: number;
  name: string;
  gridTemp: string;
  icon: string;
  componentName:
    | "TodoWidget"
    | "WeatherWidget"
    | "MotivationWidget"
    | "TimeWidget";
}