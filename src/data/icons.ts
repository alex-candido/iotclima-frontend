// src/lib/icons.ts

import {
  ActivitySquare,
  AlertTriangle,
  BarChart2,
  BatteryCharging,
  BellRing,
  ClipboardList,
  Cloud,
  CloudRain,
  FileText,
  Gauge,
  HelpCircle,
  Home,
  LayoutDashboard,
  LogOut,
  Map,
  MapPin,
  Search,
  Settings,
  Sun,
  Thermometer,
  User as UserIcon,
  Users,
  Wind
} from "lucide-react";

export const LucideIconMap: { [key: string]: React.ElementType } = {
  LayoutDashboard,
  Map,
  MapPin,
  Cloud,
  ActivitySquare,
  Gauge,
  BarChart2,
  BellRing,
  ClipboardList,
  Users,
  Settings,
  User: UserIcon,
  Thermometer,
  AlertTriangle,
  FileText,
  Home,
  HelpCircle,
  LogOut,
  Search,
};

export const WeatherIconMap: { [key: string]: React.ElementType } = {
  AlertCritical: AlertTriangle,
  AlertHigh: AlertTriangle,
  AlertMedium: AlertTriangle,
  AlertLow: AlertTriangle,
  AlertWarn: AlertTriangle,

  Rain: CloudRain,
  Sun: Sun,
  Wind: Wind,
  Maintenance: UserIcon,
  BatteryLow: BatteryCharging,
};

