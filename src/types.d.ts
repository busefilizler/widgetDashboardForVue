export interface Widgets {
  id: number;
  name: string;
  gridTemp: string;
  icon: string;
  componentName:
    | "TodoWidget"
    | "WeatherWidget"
    | "MotivationWidget"
    | "TimeWidget"
    | "CalculatorWidget"
    | "PlaceholderWidget";
  xLocation: number | null;
  yLocation: number | null;
  areaCovered: number | null;
}