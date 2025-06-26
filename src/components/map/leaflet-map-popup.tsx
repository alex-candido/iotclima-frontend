
import {
  Popup,
  PopupProps
} from "react-leaflet";

interface LeafletMapPopupProps {
  children: React.ReactNode;
}

export function LeafletMapPopup({ children,...props }: LeafletMapPopupProps & PopupProps) {
  return (
    <Popup {...props}>
      {children }
    </Popup>
  )
}
