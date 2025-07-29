// src/components/leaflet/leaflet-map-popup.tsx

import { cn } from "@/lib/utils";
import {
  Popup,
  PopupProps
} from "react-leaflet";

interface LeafletMapPopupProps {
  children: React.ReactNode;
  className?: string;
}

export function LeafletMapPopup({ children, className, ...props }: LeafletMapPopupProps & PopupProps) {
  return (
    <Popup className={cn(className)} {...props}>
      {children }
    </Popup>
  )
}
