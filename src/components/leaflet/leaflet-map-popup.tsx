// src/components/leaflet/leaflet-map-popup.tsx

import {
  Popup,
  PopupProps
} from "react-leaflet";
import { cn } from "@/lib/utils";

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
