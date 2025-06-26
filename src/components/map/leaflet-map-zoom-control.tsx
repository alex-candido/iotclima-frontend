import { ZoomControl, ZoomControlProps } from "react-leaflet";

interface LeafletMapZoomControlProps {}

export function LeafletMapZoomControl({
  ...props
}: LeafletMapZoomControlProps & ZoomControlProps) {
  return (
    <ZoomControl
      {...props}
    />
  );
}
